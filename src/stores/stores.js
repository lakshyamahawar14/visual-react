import { writable } from 'svelte/store';

const hooksCards = [
	{ id: 6, name: 'useState' },
	{ id: 7, name: 'useEffect' },
	{ id: 8, name: 'useRef' }
];

function initializeCardsMap() {
	const cardsMap = [];
	for (let i = 0; i < 5; i++) {
		cardsMap[i] = [[], []];
	}
	return cardsMap;
}

function initializeCardIdMap() {
	const cardIdMap = [];
	for (let i = 0; i < 20; i++) {
		cardIdMap[i] = -1;
	}
	return cardIdMap;
}

const CanvasStore = writable({
	cardStore: hooksCards,
	addedCardsStore: [],
	linesStore: [],
	cardsMapStore: initializeCardsMap(),
	cardsIdMapStore: initializeCardIdMap(),
	cardsNumberStore: 0,
	canvasSizeStore: [500, 500],
	nodesStore: [
		{ cardNum: -1, cardId: -1 },
		{ cardNum: -1, cardId: -1 }
	]
});

export { CanvasStore };
