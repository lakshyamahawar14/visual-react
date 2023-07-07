<script>
	import Sidebar from '../components/Sidebar.svelte';
	import Bottombar from '../components/Bottombar.svelte';
	import Canvas from '../components/Canvas.svelte';
	import { onMount } from 'svelte';
	import { loadCanvas } from '../components/LoadCanvas.svelte';

	onMount(() => {
		loadCanvas('Canvas1');
	});
</script>

<div class="main min-h-[100vh] min-w-[100vw] flex overflow-hidden">
	<Sidebar />
	<Canvas />
	<Bottombar />
</div>
