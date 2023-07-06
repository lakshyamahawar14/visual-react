import { writable } from 'svelte/store';

const hooksCards = [{ name: 'useState' }, { name: 'useEffect' }, { name: 'useRef' }];

const CardsStore = writable(hooksCards);

const LinesStore = writable([]);

const CardsNumberStore = writable(0);

const CanvasSizeStore = writable([500, 500]);

function initializeCardsMap() {
	const cardsMap = [];
	for (let i = 0; i < 10; i++) {
		cardsMap[i] = [-1, -1];
	}
	return cardsMap;
}

const NodesStore = writable([-1, -1]);

const CardMapStore = writable(initializeCardsMap());

export { CardsStore, LinesStore, CardMapStore, CardsNumberStore, CanvasSizeStore, NodesStore };
