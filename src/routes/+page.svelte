<script>
	import { onMount } from 'svelte';
	let routesCards = [{ name: 'route' }];
	let componentsCards = [{ name: 'components' }];
	let listenersCards = [
		{ name: 'onClick' },
		{ name: 'onSubmit' },
		{ name: 'onKeyUp' },
		{ name: 'onKeyDown' }
	];
	let hooksCards = [{ name: 'useState' }, { name: 'useEffect' }, { name: 'useRef' }];
	let cards = hooksCards;

	function cloneAndDragCard(card) {
		const cardsContainer = document.querySelector('.canvas');
		const cardElement = document.createElement('button');
		cardElement.className =
			'card flex-col rounded-xl cursor-move absolute z-[9] h-[100px] w-[200px] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px]';
		cardElement.style.left = '20px';
		cardElement.style.top = '20px';

		const titleElement = document.createElement('p');
		titleElement.className = 'title bg-[#dddddd] w-[100%] text-center rounded-xl rounded-b-none';
		titleElement.innerText = `${card.name}`;

		const contentElement = document.createElement('p');
		contentElement.className =
			'flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]';

		const spanElement1 = document.createElement('span');
		spanElement1.innerText = 'I/P';

		const spanElement2 = document.createElement('span');
		spanElement2.innerText = 'O/P';

		contentElement.appendChild(spanElement1);
		contentElement.appendChild(spanElement2);

		cardElement.appendChild(titleElement);
		cardElement.appendChild(contentElement);

		cardsContainer.appendChild(cardElement);
		dragElement(cardElement);
	}

	function dragElement(elmnt) {
		let pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0;
		elmnt.onmousedown = dragMouseDown;

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
			elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
		}

		function closeDragElement() {
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}

	onMount(() => {
		const routesElement = document.getElementById('routes');
		if (routesElement) {
			routesElement.addEventListener('click', () => {
				cards = routesCards;
			});
		}

		const componentsElement = document.getElementById('components');
		if (componentsElement) {
			componentsElement.addEventListener('click', () => {
				cards = componentsCards;
			});
		}

		const hooksElement = document.getElementById('hooks');
		if (hooksElement) {
			hooksElement.addEventListener('click', () => {
				cards = hooksCards;
			});
		}

		const listenersElement = document.getElementById('listeners');
		if (listenersElement) {
			listenersElement.addEventListener('click', () => {
				cards = listenersCards;
			});
		}
	});
</script>

<div class="main min-h-[100vh] min-w-[100vw] flex">
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
		<div class="canvas w-[100%] h-[75%] overflow-auto" />

		<div
			class="absolute overflow-x-auto grid-container z-[40] bottom-0 h-[25%] w-[100%] bg-[#eeeeee] items-center border-t-[1px] border-[#dddddd] p-[10px] sm:justify-center usm:justify-start"
		>
			{#each cards as card, index}
				<button
					class={`card m-[10px] flex-col rounded-xl cursor-move relative z-[9] h-[100px] w-[200px] min-w-[200px] min-h-[100px] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-center items-start backdrop-blur-[4px]`}
					on:click={() => {
						cloneAndDragCard(cards[index]);
					}}
				>
					<p class="title bg-[#dddddd] w-[100%] text-center rounded-xl rounded-b-none">
						{card.name}
					</p>
					<p class="flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]">
						<span>I/P</span><span>O/P</span>
					</p>
				</button>
			{/each}
		</div>
	</div>
</div>
