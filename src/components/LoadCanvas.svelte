<script context="module">
	import {
		CanvasStore,
		CurrentCanvasStore,
		getCanvasStore,
		resetCanvasStore
	} from '../stores/stores';
	import { addElement, clearCanvas } from '../components/AddCard.svelte';
	import { allCards } from './BottombarCards.svelte';

	let currentCanvas;
	CurrentCanvasStore.subscribe((data) => {
		currentCanvas = data;
	});

	export function autosaveCanvas() {
		let canvasData = getCanvasStore();
		localStorage.setItem(currentCanvas, JSON.stringify(canvasData));
	}

	function getCanvasStoreValue(name) {
		if (localStorage.getItem(name)) {
			const storedData = localStorage.getItem(name);
			return JSON.parse(storedData);
		}
		return null;
	}

	function loadCards(storedData) {
		const drawables = storedData.drawables;
		let cardsList = [];
		const map = [];
		for (let i = 0; i < 20; i++) {
			map[i] = 0;
		}
		drawables.forEach((d) => {
			const card = d.cards;
			const location = d.location;
			if (map[card.input] === 0) {
				const text = d.inputs.input;
				cardsList.push({ input: true, card: card.input, location: location.start, text: text });
				map[card.input] = 1;
			}
			if (map[card.output] === 0) {
				const text = d.inputs.output;
				cardsList.push({ input: false, card: card.output, location: location.end, text: text });
				map[card.output] = 1;
			}
		});
		cardsList.forEach((cl, index) => {
			const isInput = cl.input;
			const cardNum = cl.card;
			const cardLocation = cl.location;
			const text = cl.text;
			const cardId = storedData.cardIdMap[cardNum];
			const card = allCards[cardId];
			addElement(card, cardNum, cardLocation, isInput, text);
		});
	}

	export function loadCanvas(name) {
		clearCanvas();
		const storedData = getCanvasStoreValue(name);
		if (storedData === null) {
			resetCanvasStore();
		} else {
			CanvasStore.update((prevStore) => {
				return storedData;
			});
			loadCards(storedData);
		}
	}
</script>
