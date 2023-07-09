<script context="module">
	import { getCanvasStore } from '../stores/stores';
	import { allCards } from './BottombarCards.svelte';

	export async function generateCode() {
		const canvasData = getCanvasStore();
		const { drawables, cardMap, cardIdMap, cardCount } = canvasData;
		if (drawables.length === 0) {
			return;
		}
		let canvasQueryString = '';
		drawables.forEach((drawable) => {
			const cards = drawable.cards;
			const texts = drawable.inputs;
			let inputCardText = '';
			let outputCardText = '';
			texts.input.forEach((text) => {
				inputCardText += `{${text.name} : ${text.value}},\n`;
			});
			texts.output.forEach((text) => {
				outputCardText += `{${text.name} : ${text.value}}\n`;
			});
			const inputCardName = `{${allCards[cardIdMap[cards.input]].name}, ${inputCardText}},\n`;
			const outputCardName = `{${allCards[cardIdMap[cards.output]].name}, ${outputCardText}},\n`;
			const inputCardQueryString = `${inputCardName}`;
			const outputCardQueryString = `${outputCardName}`;
			canvasQueryString += `{${inputCardQueryString}, ${outputCardQueryString}},\n`;
		});
		console.log(canvasQueryString);
	}
</script>
