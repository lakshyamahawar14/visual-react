<script context="module">
	import {
		CanvasStore,
		getNodeStore,
		resetNodeStore,
		updateCanvasStore,
		updateNodeStore
	} from '../stores/stores';
	import { autosaveCanvas } from './LoadCanvas.svelte';
	import { allCards } from './BottombarCards.svelte';
	import { generalInputCard, generalTextareaCard } from './CardTemplates.svelte';

	let cardCount;
	let cardMap;
	let cardIdMap;

	CanvasStore.subscribe((data) => {
		cardCount = data.cardCount;
		cardMap = data.cardMap;
		cardIdMap = data.cardIdMap;
	});

	export function clearCanvas() {
		const cardsContainer = document.querySelector('.canvas');
		const svgElement = cardsContainer?.getElementsByTagName('svg')[0];
		if (cardsContainer && svgElement) {
			cardsContainer.innerHTML = ``;
			cardsContainer.appendChild(svgElement);
		}
	}

	export function addElement(
		cardId,
		cardNum = cardCount,
		cardLocation = [0, 0],
		isInput = false,
		inputText = []
	) {
		const card = allCards[cardId];
		const cardsContainer = document.querySelector('.canvas');
		const cardHtmlString = card.textarea
			? generalTextareaCard(cardId, cardNum)
			: generalInputCard(cardId, cardNum);
		cardsContainer?.insertAdjacentHTML('beforeend', cardHtmlString);

		const inputTagsContainer = document.querySelectorAll(`.cardInputs_${cardNum}`);
		inputText.forEach((text, index) => {
			inputTagsContainer[index].value = text.value;
		});

		const cardElement = document.getElementById(`card_${cardNum}`);
		if (cardElement && (cardLocation[0] !== 0 || cardLocation[1] !== 0)) {
			cardElement.style.top = `${cardLocation[1] - card.size.height / 2}px`;
			if (!isInput) {
				cardElement.style.left = `${cardLocation[0] - card.size.width}px`;
			} else {
				cardElement.style.left = `${cardLocation[0]}px`;
			}
		}
		const cardOutputElement = document.getElementById(`output_${cardNum}`);
		const cardInputElement = document.getElementById(`input_${cardNum}`);
		if (cardOutputElement && cardInputElement) {
			cardOutputElement.onmousedown = startDrag;
			cardInputElement.onmouseup = endDrag;
		}
		dragElement(cardElement);
	}

	function dragElement(element) {
		let pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0;
		const titleElement = element.querySelector('.title');
		titleElement.onmousedown = dragMouseDown;

		function dragMouseDown(e) {
			e.preventDefault();
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e.preventDefault();
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			element.style.top = element.offsetTop - pos2 + 'px';
			element.style.left = element.offsetLeft - pos1 + 'px';
		}

		function closeDragElement() {
			document.onmouseup = null;
			document.onmousemove = null;
			drawLines();
			autosaveCanvas();
		}
	}

	function getCardNumber(regString, cardId) {
		const numberRegex = new RegExp(`${regString}_(\\d+)`);
		const matches = cardId.match(numberRegex);
		if (matches && matches[1]) {
			return parseInt(matches[1]);
		}
		return -1;
	}

	function startDrag(e) {
		e.preventDefault();

		const startElement = document.elementFromPoint(e.clientX, e.clientY);
		if (startElement && startElement.classList.contains('outputs')) {
			const outputNode = getCardNumber('output', startElement.id);

			let outputCardClass = '';

			startElement.classList.forEach((name) => {
				if (name.startsWith('id_')) {
					outputCardClass = name;
					return;
				}
			});

			const outputCardId = getCardNumber('id', outputCardClass);

			updateNodeStore('output', { cardNum: outputNode, cardId: outputCardId });
		} else {
			resetNodeStore();
		}
	}

	function endDrag(e) {
		e.preventDefault();
		const targetElement = document.elementFromPoint(e.clientX, e.clientY);
		if (targetElement?.classList.contains('inputs')) {
			const inputNode = getCardNumber('input', targetElement.id);
			let inputCardClass = '';

			targetElement.classList.forEach((name) => {
				if (name.startsWith('id_')) {
					inputCardClass = name;
					return;
				}
			});

			const inputCardId = getCardNumber('id', inputCardClass);

			updateNodeStore('input', { cardNum: inputNode, cardId: inputCardId });

			const nodeStore = getNodeStore();
			const nodes = [nodeStore.input.cardNum, nodeStore.output.cardNum];
			const ids = [nodeStore.input.cardId, nodeStore.output.cardId];

			if (nodes[0] !== undefined && nodes[1] !== undefined && nodes[0] !== -1 && nodes[1] !== -1) {
				addLine(nodes, ids);
				drawLines();
			}
		}
		resetNodeStore();
	}

	function addLine(nodes, ids) {
		const [inputNode, outputNode] = nodes;
		const [inputCardId, outputCardId] = ids;

		const updatedCardMap = [...cardMap];
		updatedCardMap[inputNode][0].push(outputNode);
		updatedCardMap[outputNode][1].push(inputNode);

		updateCanvasStore('cardMap', updatedCardMap);

		const updatedCardIdMap = [...cardIdMap];
		updatedCardIdMap[inputNode] = inputCardId;
		updatedCardIdMap[outputNode] = outputCardId;

		updateCanvasStore('cardIdMap', updatedCardIdMap);
	}

	function drawLines() {
		const tempLines = [];

		for (let i = 0; i < cardMap.length; ++i) {
			const outputConnections = cardMap[i][0];
			outputConnections.forEach((outputCardNumber) => {
				const inputCardNumber = i;
				const start = [0, 0];
				const end = [0, 0];
				let inputCardText = [],
					outputCardText = [];
				const inputCardInputTags = document.querySelectorAll(`.cardInputs_${inputCardNumber}`);
				inputCardInputTags?.forEach((inputTag) => {
					inputCardText.push({ name: inputTag.placeholder, value: inputTag.value });
				});

				const outputCardInputTags = document.querySelectorAll(`.cardInputs_${outputCardNumber}`);
				outputCardInputTags?.forEach((outputTag) => {
					outputCardText.push({ name: outputTag.placeholder, value: outputTag.value });
				});

				const inputCardElement = document.getElementById(`input_${inputCardNumber}`);
				if (inputCardElement) {
					const startRect = inputCardElement.getBoundingClientRect();
					start[0] = startRect.left + startRect.width / 2 - 200;
					start[1] = startRect.top + startRect.height / 2;
				}

				const outputCardElement = document.getElementById(`output_${outputCardNumber}`);
				if (outputCardElement) {
					const endRect = outputCardElement.getBoundingClientRect();
					end[0] = endRect.left + endRect.width / 2 - 200;
					end[1] = endRect.top + endRect.height / 2;
				}

				tempLines.push({
					location: { start: start, end: end },
					cards: { input: inputCardNumber, output: outputCardNumber },
					inputs: { input: inputCardText, output: outputCardText }
				});
			});
		}
		updateCanvasStore('drawables', tempLines);
		autosaveCanvas();
	}
</script>
