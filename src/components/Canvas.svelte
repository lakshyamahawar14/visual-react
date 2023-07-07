<script>
	import { onMount } from 'svelte';
	import { CanvasSizeStore, CanvasStore, updateCanvasSizeStore } from '../stores/stores';

	let canvasSize;
	CanvasSizeStore.subscribe((data) => {
		canvasSize = data;
	});

	let drawables;
	CanvasStore.subscribe((data) => {
		drawables = data.drawables;
	});

	let canvasRef;

	onMount(() => {
		if (canvasRef) {
			const newCanvasSize = [canvasRef.scrollHeight, canvasRef.scrollWidth];
			updateCanvasSizeStore(newCanvasSize);
		}
	});
</script>

<div class="flex flex-col w-[100%] overflow-auto">
	<div class="canvas w-[100%] h-[75%] overflow-auto" bind:this={canvasRef}>
		<svg class="lines z-[0]" height={canvasSize[0]} width={canvasSize[1]}>
			{#each drawables as line}
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
