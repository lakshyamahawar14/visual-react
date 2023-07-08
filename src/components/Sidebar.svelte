<script>
	import { onMount } from 'svelte';
	import {
		updateCardStore,
		CanvasListStore,
		resetCanvasStore,
		CurrentCanvasStore
	} from '../stores/stores';
	import { autosaveCanvas, loadCanvas } from './LoadCanvas.svelte';
	import {
		routesCards,
		componentsCards,
		hooksCards,
		listenersCards,
		variables,
		functions,
		htmls
	} from './CardTemplates.svelte';

	let currentCanvas;
	CurrentCanvasStore.subscribe((data) => {
		currentCanvas = data;
	});

	function addNewCanvas() {
		const maxCanvasListNumber = Number.parseInt(canvasList[canvasList.length - 1].substring(6));
		CanvasListStore.update((prevList) => {
			return [...prevList, `Canvas${maxCanvasListNumber + 1}`];
		});
		CurrentCanvasStore.update((prevCanvas) => {
			return `Canvas${maxCanvasListNumber + 1}`;
		});
		resetCanvasStore();
		loadCanvas(`Canvas${maxCanvasListNumber + 1}`);
		autosaveCanvas();
	}

	let canvasList;
	CanvasListStore.subscribe((data) => {
		canvasList = data;
	});

	function getCanvasList() {
		let i = 2;
		while (localStorage.getItem(`Canvas${i}`)) {
			CanvasListStore.update((prevList) => {
				return [...prevList, `Canvas${i}`];
			});
			i++;
		}
	}

	onMount(() => {
		getCanvasList();
	});
</script>

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

					{#each canvasList as clist}
						<button
							on:click={() => {
								resetCanvasStore();
								CurrentCanvasStore.update((prevCanvas) => {
									return clist;
								});
								loadCanvas(clist);
							}}
							class={`flex items-center w-[100%] px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 cursor-pointer ${
								clist === currentCanvas ? 'active' : ''
							}`}
						>
							<span class="mx-2 text-sm font-medium">{clist}</span>
						</button>
					{/each}

					<button
						on:click={addNewCanvas}
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
						on:click={() => {
							updateCardStore(routesCards);
						}}
					>
						<span class="mx-2 text-sm font-medium">Routes</span>
					</button>

					<button
						class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
						id="components"
						on:click={() => {
							updateCardStore(componentsCards);
						}}
					>
						<span class="mx-2 text-sm font-medium">Components</span>
					</button>

					<button
						class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
						id="hooks"
						on:click={() => {
							updateCardStore(hooksCards);
						}}
					>
						<span class="mx-2 text-sm font-medium">Hooks</span>
					</button>

					<button
						class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
						id="listeners"
						on:click={() => {
							updateCardStore(listenersCards);
						}}
					>
						<span class="mx-2 text-sm font-medium">Event Listeners</span>
					</button>

					<button
						class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
						id="variables"
						on:click={() => {
							updateCardStore(variables);
						}}
					>
						<span class="mx-2 text-sm font-medium">Variables</span>
					</button>

					<button
						class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
						id="functions"
						on:click={() => {
							updateCardStore(functions);
						}}
					>
						<span class="mx-2 text-sm font-medium">Functions</span>
					</button>

					<button
						class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
						id="htmls"
						on:click={() => {
							updateCardStore(htmls);
						}}
					>
						<span class="mx-2 text-sm font-medium">HTMLs</span>
					</button>
				</div>
			</nav>
		</div>
	</aside>
</div>
