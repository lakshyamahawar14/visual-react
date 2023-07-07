<script>
	import {
		CanvasStore,
		getNodeStore,
		resetNodeStore,
		updateCanvasStore,
		updateNodeStore
	} from '../stores/stores';

	export let card;

	let cardCount;
	let cardMap;
	let cardIdMap;

	CanvasStore.subscribe((data) => {
		cardCount = data.cardCount;
		cardMap = data.cardMap;
		cardIdMap = data.cardIdMap;
	});

	function cloneAndDragCard(card) {
		const cardsContainer = document.querySelector('.canvas');
		const cardElement = document.createElement('button');
		cardElement.className = `card flex-col rounded-xl cursor-default absolute z-[35] h-[100px] w-[200px] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px] id_${card.id}`;
		cardElement.style.left = '20px';
		cardElement.style.top = '20px';
		cardElement.id = `card_${cardCount}`;

		const titleElement = document.createElement('p');
		titleElement.className =
			'title absolute top-0 bg-[#dddddd] w-[100%] z-[20] text-center rounded-xl rounded-b-none cursor-move';
		titleElement.innerText = `${card.name}`;

		const contentElement = document.createElement('p');
		contentElement.className =
			'flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]';

		const spanElement1 = document.createElement('span');
		spanElement1.innerText = 'I/P';
		spanElement1.className = 'left flex flex-start items-center pl-[10px]';

		const spanElement2 = document.createElement('span');
		spanElement2.innerText = 'O/P';
		spanElement2.className = 'right flex flex-start items-center pr-[10px]';

		const spanElement3 = document.createElement('span');
		spanElement3.className = `inputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute left-[-5px] text-start  cursor-pointer id_${card.id}`;
		spanElement3.addEventListener('mouseup', endDrag);
		spanElement3.id = `input_${cardCount}`;

		const spanElement4 = document.createElement('span');
		spanElement4.className = `outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start  cursor-pointer id_${card.id}`;
		spanElement4.addEventListener('mousedown', startDrag);
		spanElement4.id = `output_${cardCount}`;

		spanElement1.appendChild(spanElement3);
		spanElement2.appendChild(spanElement4);

		contentElement.appendChild(spanElement1);
		contentElement.appendChild(spanElement2);

		cardElement.appendChild(titleElement);
		cardElement.appendChild(contentElement);

		cardsContainer?.appendChild(cardElement);
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
			// const inputConnections = cardMap[i][1];

			outputConnections.forEach((outputCardNumber) => {
				const inputCardNumber = i;
				const start = [0, 0];
				const end = [0, 0];

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
					cards: { input: inputCardNumber, output: outputCardNumber }
				});
			});

			// inputConnections.forEach((inputCardNumber) => {
			// 	const outputCardNumber = i;
			// 	const start = [0, 0];
			// 	const end = [0, 0];

			// 	const inputCardElement = document.getElementById(`input_${inputCardNumber}`);
			// 	if (inputCardElement) {
			// 		const startRect = inputCardElement.getBoundingClientRect();
			// 		start[0] = startRect.left + startRect.width / 2 - 200;
			// 		start[1] = startRect.top + startRect.height / 2;
			// 	}

			// 	const outputCardElement = document.getElementById(`output_${outputCardNumber}`);
			// 	if (outputCardElement) {
			// 		const endRect = outputCardElement.getBoundingClientRect();
			// 		end[0] = endRect.left + endRect.width / 2 - 200;
			// 		end[1] = endRect.top + endRect.height / 2;
			// 	}

			// 	tempLines.push({
			// 		location: { start: start, end: end },
			// 		cards: { input: inputCardNumber, output: outputCardNumber }
			// 	});
			// });
		}
		updateCanvasStore('drawables', tempLines);
	}
</script>

<button
	class={`card m-[10px] flex-col rounded-xl cursor-pointer relative z-[90] h-[100px] w-[200px] min-w-[200px] min-h-[100px] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-center items-start backdrop-blur-[4px]`}
	on:click={() => {
		cloneAndDragCard(card);
		updateCanvasStore('cardCount', cardCount + 1);
	}}
>
	<p
		class="title absolute top-0 bg-[#dddddd] z-[20] w-[100%] text-center rounded-xl rounded-b-none"
	>
		{card.name}
	</p>
	<p class="flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]">
		<span class="left flex flex-start items-center pl-[10px]"
			><span
				class="h-[10px] w-[10px] rounded-full bg-[#ff0000] absolute left-[-5px] text-start hover:cursor-default'"
			/>I/P</span
		><span class="right flex flex-start items-center pr-[10px]"
			>O/P<span
				class="h-[10px] w-[10px] rounded-full bg-[#ff0000] absolute right-[-5px] text-start hover:cursor-default'"
			/></span
		>
	</p>
</button>
