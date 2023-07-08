<script context="module">
	import {
		CanvasStore,
		getNodeStore,
		resetNodeStore,
		updateCanvasStore,
		updateNodeStore
	} from '../stores/stores';
	import { autosaveCanvas } from './LoadCanvas.svelte';

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
		card,
		cardNum = cardCount,
		cardLocation = [0, 0],
		isInput = false,
		inputText = ''
	) {
		const cardsContainer = document.querySelector('.canvas');
		const inputElementString = `<input id="text_${cardNum}" type="text" class="outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[30px] px-[5px] placeholder-[#333333] placeholder-opacity-[0.7]" placeholder="${card.placeholder}" value="${inputText}"></input>`;
		const textareaElementString = `<textarea id="text_${cardNum}" class="outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7]" placeholder="${card.placeholder}" value="${inputText}"></textarea>`;
		cardsContainer?.insertAdjacentHTML(
			'beforeend',
			`
                <button class="card flex-col rounded-xl cursor-default absolute z-[35] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px] id_${
									card.id
								}"
                    id="card_${cardNum}"
                    style="left: 20px; top: 20px; height: ${card.size.height}px; width: ${
				card.size.width
			}px;"
                    >
                    <p class="title absolute top-0 bg-[#dddddd] w-[100%] z-[20] text-center rounded-xl rounded-b-none cursor-move">
                        ${card.name}
                    </p>
                    <p class="flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]">
                        <span class="left flex flex-start items-center pl-[10px]">
                            I/P<span class="inputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute left-[-5px] text-start cursor-pointer id_${
															card.id
														}" id="input_${cardNum}"></span>
                        </span>
						${card.textarea ? textareaElementString : inputElementString}
                        <span class="right flex flex-start items-center pr-[10px]">
                            O/P<span class="outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start cursor-pointer id_${
															card.id
														}" id="output_${cardNum}"></span>
                        </span>
                    </p>
                </button>
            `
		);
		const cardElement = document.getElementById(`card_${cardNum}`);
		if (card.textarea) {
			const textareaElement = document.getElementById(`text_${cardNum}`);
			if (textareaElement) {
				textareaElement.value = inputText;
			}
		}
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

	const allCards = [
		{
			id: 0,
			name: 'route',
			placeholder: 'name',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 1,
			name: 'components',
			placeholder: 'name',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 2,
			name: 'onClick',
			placeholder: 'function',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 3,
			name: 'onSubmit',
			placeholder: 'function',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 4,
			name: 'onKeyUp',
			placeholder: 'function',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 5,
			name: 'onKeyDown',
			placeholder: 'function',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 6,
			name: 'useState',
			placeholder: 'initial value',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 7,
			name: 'useEffect',
			placeholder: 'dependencies',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 8,
			name: 'useRef',
			placeholder: 'initial value',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 9,
			name: 'const',
			placeholder: 'value',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 10,
			name: 'let',
			placeholder: 'value',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 11,
			name: 'function',
			placeholder: 'argument',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 12,
			name: 'html',
			placeholder: 'html code',
			size: { height: 300, width: 300 },
			textarea: true
		}
	];

	function drawLines() {
		const tempLines = [];

		for (let i = 0; i < cardMap.length; ++i) {
			const outputConnections = cardMap[i][0];
			outputConnections.forEach((outputCardNumber) => {
				const inputCardNumber = i;
				const start = [0, 0];
				const end = [0, 0];
				let inputCardTextElement = document.getElementById(`text_${inputCardNumber}`);
				let outputCardTextElement = document.getElementById(`text_${outputCardNumber}`);
				let inputCardText = '',
					outputCardText = '';
				if (inputCardTextElement) {
					inputCardText = inputCardTextElement.value;
				}
				if (outputCardTextElement) {
					outputCardText = outputCardTextElement.value;
				}
				const inputCardElement = document.getElementById(`input_${inputCardNumber}`);
				if (inputCardElement) {
					const startRect = inputCardElement.getBoundingClientRect();
					const cardId = cardIdMap[inputCardNumber];
					const card = allCards[cardId];
					start[0] = startRect.left + startRect.width / 2 - 200;
					start[1] = startRect.top + startRect.height / 2;
				}

				const outputCardElement = document.getElementById(`output_${outputCardNumber}`);
				if (outputCardElement) {
					const endRect = outputCardElement.getBoundingClientRect();
					const cardId = cardIdMap[inputCardNumber];
					const card = allCards[cardId];
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
