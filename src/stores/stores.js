import { writable } from 'svelte/store';

const hooksCards = [
	{ id: 6, name: 'useState' },
	{ id: 7, name: 'useEffect' },
	{ id: 8, name: 'useRef' }
];

const CardStore = writable(hooksCards);

function getCardStore() {
	let cardStore;
	CardStore.subscribe((data) => {
		cardStore = data;
	});
	return cardStore;
}

function updateCardStore(value) {
	CardStore.update((prevStore) => {
		return value;
	});
}

const CanvasSizeStore = writable([500, 500]);

function getCanvasSizeStore() {
	let canvasSizeStore;
	CanvasSizeStore.subscribe((data) => {
		canvasSizeStore = data;
	});
	return canvasSizeStore;
}

function updateCanvasSizeStore(value) {
	CanvasSizeStore.update((prevStore) => {
		return value;
	});
}

const NodeStore = writable({
	input: { cardNum: -1, cardId: -1 },
	output: { cardNum: -1, cardId: -1 }
});

function getNodeStore() {
	let nodeStore;
	NodeStore.subscribe((data) => {
		nodeStore = data;
	});
	return nodeStore;
}

function updateNodeStore(property, value) {
	NodeStore.update((prevStore) => {
		return {
			...prevStore,
			[property]: value
		};
	});
}

function resetNodeStore() {
	NodeStore.set({
		input: { cardNum: -1, cardId: -1 },
		output: { cardNum: -1, cardId: -1 }
	});
}

function initializeCardMap() {
	const cardsMap = [];
	for (let i = 0; i < 20; i++) {
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
	drawables: [],
	cardMap: initializeCardMap(),
	cardIdMap: initializeCardIdMap(),
	cardCount: 0
});

function getCanvasStore() {
	let canvasStore;
	CanvasStore.subscribe((data) => {
		canvasStore = data;
	});
	return canvasStore;
}

function updateCanvasStore(property, value) {
	CanvasStore.update((prevStore) => {
		return {
			...prevStore,
			[property]: value
		};
	});
}

const CanvasListStore = writable(['Canvas1']);

export {
	CardStore,
	CanvasSizeStore,
	NodeStore,
	CanvasStore,
	CanvasListStore,
	getCardStore,
	updateCardStore,
	getCanvasSizeStore,
	updateCanvasSizeStore,
	getNodeStore,
	updateNodeStore,
	resetNodeStore,
	getCanvasStore,
	updateCanvasStore
};
