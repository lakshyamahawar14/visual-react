<script>
	import Card from './Card.svelte';
	import { CardStore } from '../stores/stores';

	let cards;
	CardStore.subscribe((data) => {
		cards = data;
	});
</script>

<div
	class="absolute grid-container overflow-auto pl-[200px] z-[40] bottom-0 h-[25%] w-[100%] bg-[#eeeeee] items-center border-t-[1px] border-[#dddddd] p-[10px] sm:justify-center usm:justify-start"
>
	{#each cards as card}
		<Card {card} />
	{/each}
</div>
