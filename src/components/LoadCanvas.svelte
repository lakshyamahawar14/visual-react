<script context="module">
	import {
		CanvasStore,
		CurrentCanvasStore,
		getCanvasStore,
		resetCanvasStore
	} from '../stores/stores';
	import { addElement, clearCanvas } from '../components/AddCard.svelte';

	const allCards = [
		{
			id: 0,
			name: 'route',
			placeholder: 'name',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 1,
			name: 'components',
			placeholder: 'name',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 2,
			name: 'onClick',
			placeholder: 'function',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 3,
			name: 'onSubmit',
			placeholder: 'function',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 4,
			name: 'onKeyUp',
			placeholder: 'function',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 5,
			name: 'onKeyDown',
			placeholder: 'function',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 6,
			name: 'useState',
			placeholder: 'initial value',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 7,
			name: 'useEffect',
			placeholder: 'dependencies',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 8,
			name: 'useRef',
			placeholder: 'initial value',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 9,
			name: 'const',
			placeholder: 'value',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 10,
			name: 'let',
			placeholder: 'value',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 11,
			name: 'function',
			placeholder: 'argument',
			size: { height: 100, width: 200 },
			textarea: false
		},
		{
			id: 12,
			name: 'html',
			placeholder: 'html code',
			size: { height: 300, width: 300 },
			textarea: true
		}
	];

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
				cardsList.push({ input: true, card: card.input, location: location.start });
				map[card.input] = 1;
			}
			if (map[card.output] === 0) {
				cardsList.push({ input: false, card: card.output, location: location.end });
				map[card.output] = 1;
			}
		});
		cardsList.forEach((cl, index) => {
			const isInput = cl.input;
			const cardNum = cl.card;
			const cardLocation = cl.location;
			const cardId = storedData.cardIdMap[cardNum];
			const card = allCards[cardId];
			addElement(card, cardNum, cardLocation, isInput);
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
