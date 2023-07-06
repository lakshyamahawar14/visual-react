<script>
	import { CardsStore } from '../stores/stores';

	let routesCards = [{ name: 'route' }];
	let componentsCards = [{ name: 'components' }];
	let listenersCards = [
		{ name: 'onClick' },
		{ name: 'onSubmit' },
		{ name: 'onKeyUp' },
		{ name: 'onKeyDown' }
	];
	let hooksCards = [{ name: 'useState' }, { name: 'useEffect' }, { name: 'useRef' }];
</script>

<div class="sidebar z-[100] min-w-[200px] overflow-hidden">
	<aside class="flex flex-col h-screen px-5 py-8 bg-[#dddddd] border-[#dddddd] border-r-[1px]">
		<a href="/">
			<h1 class="cursor-default font-[600] tracking-wide">
				Visual React <span class="version font-[400]">v1.0</span>
			</h1>
		</a>

		<div class="flex flex-col justify-between flex-1 mt-6">
			<nav class="-mx-3 space-y-6">
				<div class="space-y-3">
					<h2 class="px-3 text-xs uppercase text-[#101010]">canvas</h2>

					<p
						class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200"
					>
						<span class="mx-2 text-sm font-medium">New Canvas</span>
					</p>

					<button
						class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
					>
						<span class="mx-2 text-sm font-medium">+ Add Canvas</span>
					</button>
				</div>

				<div class="space-y-3">
					<h2 class="px-3 text-xs uppercase text-[#101010]">cards</h2>

					<button
						class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
						id="routes"
						on:click={() => {
							CardsStore.update((prevCards) => routesCards);
						}}
					>
						<span class="mx-2 text-sm font-medium">Routes</span>
					</button>

					<button
						class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
						id="components"
						on:click={() => {
							CardsStore.update((prevCards) => componentsCards);
						}}
					>
						<span class="mx-2 text-sm font-medium">Components</span>
					</button>

					<button
						class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
						id="hooks"
						on:click={() => {
							CardsStore.update((prevCards) => hooksCards);
						}}
					>
						<span class="mx-2 text-sm font-medium">Hooks</span>
					</button>

					<button
						class="flex w-[100%] items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
						id="listeners"
						on:click={() => {
							CardsStore.update((prevCards) => listenersCards);
						}}
					>
						<span class="mx-2 text-sm font-medium">Event Listeners</span>
					</button>
				</div>
			</nav>
		</div>
	</aside>
</div>
