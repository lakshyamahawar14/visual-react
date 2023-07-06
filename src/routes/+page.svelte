<script>
	import { onMount } from 'svelte';
	import { CardsStore, LinesStore, CardMapStore } from '../stores';

	let cardsNumber = 0;

	let cards;

	CardsStore.subscribe((data) => {
		cards = data;
	});

	let canvasRef;

	let canvasHeight = 500,
		canvasWidth = 500;

	let routesCards = [{ name: 'route' }];
	let componentsCards = [{ name: 'components' }];
	let listenersCards = [
		{ name: 'onClick' },
		{ name: 'onSubmit' },
		{ name: 'onKeyUp' },
		{ name: 'onKeyDown' }
	];
	let hooksCards = [{ name: 'useState' }, { name: 'useEffect' }, { name: 'useRef' }];

	function cloneAndDragCard(card, index) {
		const cardsContainer = document.querySelector('.canvas');
		const cardElement = document.createElement('button');
		cardElement.className =
			'card flex-col rounded-xl cursor-default absolute z-[90] h-[100px] w-[200px] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px]';
		cardElement.style.left = '20px';
		cardElement.style.top = '20px';
		cardElement.id = `card_${cardsNumber}`;

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
		spanElement3.className =
			'inputs h-[10px] w-[10px] rounded-full bg-[#ff0000] absolute left-[-5px] text-start  cursor-pointer';
		spanElement3.addEventListener('mouseup', endDrag);
		spanElement3.id = `input_${cardsNumber}`;

		const spanElement4 = document.createElement('span');
		spanElement4.className =
			'outputs h-[10px] w-[10px] rounded-full bg-[#ff0000] absolute right-[-5px] text-start  cursor-pointer';
		spanElement4.addEventListener('mousedown', startDrag);
		spanElement4.id = `output_${cardsNumber}`;

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
		}
	}

	let lines;

	LinesStore.subscribe((data) => {
		lines = data;
	});

	let startX = 0,
		startY = 0,
		endX = 0,
		endY = 0;

	let inputNode = -1,
		outputNode = -1;

	onMount(() => {
		const canvasElement = document.getElementsByClassName('canvas')[0];

		if (canvasElement) {
			canvasHeight = canvasElement.scrollHeight;
			canvasWidth = canvasElement.scrollWidth;
		}

		const routesElement = document.getElementById('routes');
		if (routesElement) {
			routesElement.addEventListener('click', () => {
				CardsStore.update((prevValue) => routesCards);
			});
		}

		const componentsElement = document.getElementById('components');
		if (componentsElement) {
			componentsElement.addEventListener('click', () => {
				CardsStore.update((prevValue) => componentsCards);
			});
		}

		const hooksElement = document.getElementById('hooks');
		if (hooksElement) {
			hooksElement.addEventListener('click', () => {
				CardsStore.update((prevValue) => hooksCards);
			});
		}

		const listenersElement = document.getElementById('listeners');
		if (listenersElement) {
			listenersElement.addEventListener('click', () => {
				CardsStore.update((prevValue) => listenersCards);
			});
		}
	});

	function getCardNumber(regString, cardId) {
		const numberRegex = new RegExp(`${regString}_(\\d+)`);
		const matches = cardId.match(numberRegex);
		if (matches && matches[1]) {
			return parseInt(matches[1]);
		}
		return -1;
	}

	function startDrag(event) {
		event.preventDefault();

		const startElement = document.elementFromPoint(event.clientX, event.clientY);

		if (startElement && startElement.classList.contains('outputs')) {
			const startRect = startElement.getBoundingClientRect();
			startX = startRect.left + startRect.width / 2 - 200 - 10;
			startY = startRect.top + startRect.height / 2 - 10;
			outputNode = getCardNumber('output', startElement.id);
		}
	}

	function endDrag(event) {
		event.preventDefault();
		const targetElement = document.elementFromPoint(event.clientX, event.clientY);
		if (targetElement?.classList.contains('inputs')) {
			const targetRect = targetElement.getBoundingClientRect();
			endX = targetRect.left + targetRect.width / 2 - 200 - 10;
			endY = targetRect.top + targetRect.height / 2 - 10;
			inputNode = getCardNumber('input', targetElement.id);

			if (startX === 0 && startY === 0) {
				(startX = 0), (startY = 0), (endX = 0), (endY = 0);
				(inputNode = -1), (outputNode = -1);
				return;
			}
			addLine(inputNode, outputNode);
			drawLines();
			(startX = 0), (startY = 0), (endX = 0), (endY = 0);
			(inputNode = -1), (outputNode = -1);
		}
	}

	let cardMap;
	CardMapStore.subscribe((data) => {
		cardMap = data;
	});

	function addLine(inputNode, outputNode) {
		CardMapStore.update((prevValue) => {
			const newCardMap = [...prevValue];
			newCardMap[inputNode][0] = outputNode;
			newCardMap[outputNode][1] = inputNode;
			return newCardMap;
		});
	}

	function drawLines() {
		let tempLines = [];
		for (let i = 0; i < cardMap.length; ++i) {
			if (cardMap[i][0] === -1 && cardMap[i][1] === -1) {
				continue;
			}
			if (cardMap[i][0] !== -1) {
				const inputCardNumber = i,
					outputCardNumber = cardMap[i][0];
				const start = [0, 0],
					end = [0, 0];

				const inputCardElement = document.getElementById(`input_${inputCardNumber}`);
				if (inputCardElement) {
					const startRect = inputCardElement.getBoundingClientRect();
					start[0] = startRect.left + startRect.width / 2 - 200 - 10;
					start[1] = startRect.top + startRect.height / 2 - 10;
				}

				const outputCardElement = document.getElementById(`output_${outputCardNumber}`);
				if (outputCardElement) {
					const endRect = outputCardElement.getBoundingClientRect();
					end[0] = endRect.left + endRect.width / 2 - 200 - 10;
					end[1] = endRect.top + endRect.height / 2 - 10;
				}

				tempLines.push({ location: { start: start, end: end } });
			}

			if (cardMap[i][1] !== -1) {
				const outputCardNumber = i,
					inputCardNumber = cardMap[i][1];
				const start = [0, 0],
					end = [0, 0];
				const inputCardElement = document.getElementById(`input_${inputCardNumber}`);
				if (inputCardElement) {
					const startRect = inputCardElement.getBoundingClientRect();
					start[0] = startRect.left + startRect.width / 2 - 200 - 10;
					start[1] = startRect.top + startRect.height / 2 - 10;
				}

				const outputCardElement = document.getElementById(`output_${outputCardNumber}`);
				if (outputCardElement) {
					const endRect = outputCardElement.getBoundingClientRect();
					end[0] = endRect.left + endRect.width / 2 - 200 - 10;
					end[1] = endRect.top + endRect.height / 2 - 10;
				}
				tempLines.push({ location: { start: start, end: end } });
			}
		}
		LinesStore.update((prevLines) => {
			return [...tempLines];
		});
	}
</script>

<div class="main min-h-[100vh] min-w-[100vw] flex overflow-hidden">
	<div class="sidebar z-[100] min-w-[200px] overflow-hidden">
		<aside class="flex flex-col h-screen px-5 py-8 bg-[#dddddd] border-[#dddddd] border-r-[1px]">
			<a href="/">
				<h1 class="cursor-default font-[600] tracking-wide">
					Visual React <span class="version font-[400]">v1.0</span>
				</h1>
			</a>

			<div class="flex flex-col justify-between flex-1 mt-6">
				<nav class="-mx-3 space-y-6">
					<div class="space-y-3">
						<h2 class="px-3 text-xs uppercase text-[#101010]">canvas</h2>

						<p
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200"
						>
							<span class="mx-2 text-sm font-medium">New Canvas</span>
						</p>

						<button
							class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
						>
							<span class="mx-2 text-sm font-medium">+ Add Canvas</span>
						</button>
					</div>

					<div class="space-y-3">
						<h2 class="px-3 text-xs uppercase text-[#101010]">cards</h2>

						<button
							class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							id="routes"
						>
							<span class="mx-2 text-sm font-medium">Routes</span>
						</button>

						<button
							class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							id="components"
						>
							<span class="mx-2 text-sm font-medium">Components</span>
						</button>

						<button
							class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							id="hooks"
						>
							<span class="mx-2 text-sm font-medium">Hooks</span>
						</button>

						<button
							class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							id="listeners"
						>
							<span class="mx-2 text-sm font-medium">Event Listeners</span>
						</button>
					</div>
				</nav>
			</div>
		</aside>
	</div>
	<div class="flex flex-col w-[100%]">
		<div class="canvas w-[100%] h-[75%] overflow-scroll p-[10px]" bind:this={canvasRef}>
			<svg class="lines z-[0] overflow-scroll" height={canvasHeight - 20} width={canvasWidth - 20}>
				{#each lines as line, index}
					<line
						class="line z-[30] absolute top-0 left-0"
						x1={line.location.start[0]}
						y1={line.location.start[1]}
						x2={line.location.end[0]}
						y2={line.location.end[1]}
						style="stroke: rgb(255, 0, 0); stroke-width: 2;"
					/>
				{/each}
			</svg>
		</div>
		<div
			class="absolute grid-container overflow-auto z-[40] bottom-0 h-[25%] w-[100%] bg-[#eeeeee] items-center border-t-[1px] border-[#dddddd] p-[10px] sm:justify-center usm:justify-start"
		>
			{#each cards as card, index}
				<button
					class={`card m-[10px] flex-col rounded-xl cursor-pointer relative z-[90] h-[100px] w-[200px] min-w-[200px] min-h-[100px] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-center items-start backdrop-blur-[4px]`}
					on:click={() => {
						cloneAndDragCard(cards[index], index);
						cardsNumber += 1;
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
			{/each}
		</div>
	</div>
</div>

<style>
	.line {
		color: red;
		background-color: red;
	}
</style>
