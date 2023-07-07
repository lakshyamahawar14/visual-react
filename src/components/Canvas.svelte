<script>
	import { onMount } from 'svelte';
	import { CanvasStore } from '../stores/stores';

	let canvasSize;
	CanvasStore.subscribe((data) => {
		canvasSize = data.canvasSizeStore;
	});

	let lines;
	CanvasStore.subscribe((data) => {
		lines = data.linesStore;
	});

	let canvasRef;

	onMount(() => {
		if (canvasRef) {
			const canvasHeight = canvasRef.scrollHeight;
			const canvasWidth = canvasRef.scrollWidth;

			CanvasStore.update((prevStore) => {
				const {
					cardStore,
					addedCardsStore,
					linesStore,
					cardsMapStore,
					cardsIdMapStore,
					cardsNumberStore,
					canvasSizeStore,
					nodesStore
				} = prevStore;

				const updatedCanvasSizeStore = [canvasHeight, canvasWidth];

				return {
					cardStore,
					addedCardsStore,
					linesStore,
					cardsMapStore,
					cardsIdMapStore,
					cardsNumberStore,
					canvasSizeStore: updatedCanvasSizeStore,
					nodesStore
				};
			});
		}
	});
</script>

<div class="flex flex-col w-[100%] overflow-auto">
	<div class="canvas w-[100%] h-[75%] overflow-auto" bind:this={canvasRef}>
		<svg class="lines z-[0]" height={canvasSize[0]} width={canvasSize[1]}>
			{#each lines as line}
				<path
					class="line z-[30] absolute top-0 left-0"
					d={`M ${line.location.start[0]} ${line.location.start[1]}
					Q ${(line.location.start[0] + line.location.end[0]) / 2} ${line.location.start[1]}
					${line.location.end[0]} ${line.location.end[1]}`}
					style="stroke: rgb(255, 0, 0); stroke-width: 2; fill: transparent;"
				/>
			{/each}
		</svg>
	</div>
</div>

<style>
	.line {
		color: red;
		background-color: red;
	}
</style>
