import { writable } from 'svelte/store';

const hooksCards = [{ name: 'useState' }, { name: 'useEffect' }, { name: 'useRef' }];

const CardsStore = writable(hooksCards);

const LinesStore = writable([]);

export { CardsStore, LinesStore };
