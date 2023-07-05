<script>
	import { onMount } from 'svelte';
	let cards = [{ name: 'component1' }, { name: 'component2' }];

	onMount(() => {
		const cardsElements = document.getElementsByClassName('card');

		for (let i = 0; i < cardsElements.length; i++) {
			dragElement(cardsElements[i]);
		}

		function dragElement(elmnt) {
			var pos1 = 0,
				pos2 = 0,
				pos3 = 0,
				pos4 = 0;
			if (document.getElementById(elmnt.id + 'header')) {
				document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
			} else {
				elmnt.onmousedown = dragMouseDown;
			}

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
	});
</script>

<div class="main min-h-[100vh] min-w-[100vw] flex">
	<div class="sidebar z-[100]">
		<aside
			class="flex flex-col w-[15%] min-w-[200px] h-screen px-5 py-8 overflow-y-auto bg-[#fcfcfc] border-[#dddddd] border-r-[1px]"
		>
			<a href="/">
				<h1 class="cursor-default font-[600] tracking-wide">
					Visual React <span class="version font-[400]">v1.0</span>
				</h1>
			</a>

			<div class="flex flex-col justify-between flex-1 mt-6">
				<nav class="-mx-3 space-y-6">
					<div class="space-y-3">
						<h2 class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">canvas</h2>

						<p
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200"
						>
							<span class="mx-2 text-sm font-medium">New Canvas</span>
						</p>

						<a
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							href="/"
						>
							<span class="mx-2 text-sm font-medium">+ Add Canvas</span>
						</a>
					</div>

					<div class="space-y-3">
						<h2 class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">cards</h2>

						<a
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							href="/"
						>
							<span class="mx-2 text-sm font-medium">Routes</span>
						</a>

						<a
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							href="/"
						>
							<span class="mx-2 text-sm font-medium">Components</span>
						</a>

						<a
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							href="/"
						>
							<span class="mx-2 text-sm font-medium">Hooks</span>
						</a>

						<a
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							href="/"
						>
							<span class="mx-2 text-sm font-medium">Event Listeners</span>
						</a>
					</div>
				</nav>
			</div>
		</aside>
	</div>
	<div class="canvas w-[100%]">
		<div
			class="absolute bottom-0 h-[25%] w-[100%] bg=[#fcfcfc] flex items-center justify-center border-t-[1px] border-[#dddddd]"
		>
			{#each cards as card, index}
				<div
					class={`card flex-col cursor-move absolute z-[9] h-[100px] w-[200px] bg-[#f1f1f1] flex justify-start items-center`}
					style="left: {210 * index + 10}px;"
				>
					<p class="title bg-[#dddddd] w-[100%] text-center">Card {card.name}</p>
					<p class="m-auto">Component Card</p>
				</div>
			{/each}
		</div>
	</div>
</div>
