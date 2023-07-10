<script>
	import Sidebar from '../components/Sidebar.svelte';
	import Bottombar from '../components/Bottombar.svelte';
	import { onMount } from 'svelte';
	import { loadCanvas } from '../components/LoadCanvas.svelte';
	import Canvas from '../components/Canvas.svelte';
	import Generate from '../components/Generate.svelte';
	import { configureOpenAI } from '../components/OpenAI.svelte';
	import { OpenAPIStore } from '../stores/stores';

	onMount(() => {
		loadCanvas('Canvas1');
		const openaiObj = configureOpenAI();

		OpenAPIStore.update((prevAPI) => {
			return openaiObj;
		});
	});
</script>

<div class="main min-h-[100vh] min-w-[100vw] flex overflow-hidden">
	<Sidebar />
	<Canvas />
	<Generate />
	<Bottombar />
</div>
