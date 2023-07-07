<script>
	import Sidebar from '../components/Sidebar.svelte';
	import Bottombar from '../components/Bottombar.svelte';
	import Canvas from '../components/Canvas.svelte';
	import { onMount } from 'svelte';
	import { updateCanvasStore } from '../stores/stores';

	function getCanvasStoreDefaultValue() {
		if (localStorage.getItem(`CanvasStore${0}`)) {
			return JSON.parse(localStorage.getItem(`CanvasStore${0}`));
		}
		return null;
	}

	onMount(() => {
		let storedData = getCanvasStoreDefaultValue();
		if (storedData !== null) {
			updateCanvasStore(storedData);
		}
	});
</script>

<div class="main min-h-[100vh] min-w-[100vw] flex overflow-hidden">
	<Sidebar />
	<Canvas />
	<Bottombar />
</div>
