<script>
	import { CanvasStore, updateCanvasStore } from '../stores/stores';
	import { addElement } from './AddCard.svelte';

	export let card;

	let cardCount;

	CanvasStore.subscribe((data) => {
		cardCount = data.cardCount;
	});
</script>

<button
	class={`card m-[10px] flex-col rounded-xl cursor-pointer relative z-[90] h-[100px] w-[200px] min-w-[200px] min-h-[100px] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-center items-start backdrop-blur-[4px]`}
	on:click={() => {
		addElement(card);
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
