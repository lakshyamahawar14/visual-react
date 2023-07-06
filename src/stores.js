import { writable } from 'svelte/store';

const hooksCards = [{ name: 'useState' }, { name: 'useEffect' }, { name: 'useRef' }];

const CardsStore = writable(hooksCards);

const LinesStore = writable([]);

function initializeCardsMap() {
	const cardsMap = [];
	for (let i = 0; i < 10; i++) {
		cardsMap[i] = [-1, -1];
	}
	return cardsMap;
}

const CardMapStore = writable(initializeCardsMap());

export { CardsStore, LinesStore, CardMapStore };
