<script>
	import Sidebar from '../components/Sidebar.svelte';
	import Bottombar from '../components/Bottombar.svelte';
	import Canvas from '../components/Canvas.svelte';
	import { onMount } from 'svelte';
	import { CanvasStore, updateCanvasStore } from '../stores/stores';
	import { addElement } from '../components/AddCard.svelte';

	const allCards = [
		{ id: 0, name: 'route' },
		{ id: 1, name: 'components' },
		{ id: 2, name: 'onClick' },
		{ id: 3, name: 'onSubmit' },
		{ id: 4, name: 'onKeyUp' },
		{ id: 5, name: 'onKeyDown' },
		{ id: 6, name: 'useState' },
		{ id: 7, name: 'useEffect' },
		{ id: 8, name: 'useRef' }
	];

	function getCanvasStoreDefaultValue() {
		if (localStorage.getItem(`CanvasStore${0}`)) {
			const storedData = localStorage.getItem(`CanvasStore${0}`);
			return JSON.parse(storedData);
		}
		return null;
	}

	function loadCards(storedData) {
		const drawables = storedData.drawables;
		let cardsList = [];
		drawables.forEach((d) => {
			const card = d.cards;
			const location = d.location;
			cardsList.push([card.input, location.start]);
			cardsList.push([card.output, location.end]);
		});
		cardsList.forEach((cl) => {
			const [cardNum, cardLocation] = cl;
			const cardId = storedData.cardIdMap[cardNum];
			const card = allCards[cardId];
			addElement(card, cardNum, cardLocation);
		});
		// const cardId = storedData.cardIdMap[0];
		// const card = allCards[cardId];
		// console.log('card: ', card);
	}

	function loadCanvas() {
		const storedData = getCanvasStoreDefaultValue();
		if (storedData === null) {
			return;
		}
		console.log(storedData);
		CanvasStore.update((prevStore) => {
			return storedData;
		});
		loadCards(storedData);
	}

	onMount(() => {
		loadCanvas();
	});
</script>

<div class="main min-h-[100vh] min-w-[100vw] flex overflow-hidden">
	<Sidebar />
	<Canvas />
	<Bottombar />
</div>
