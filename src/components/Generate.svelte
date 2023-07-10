<script>
	import { GeneratedCodeStore } from '../stores/stores';
	import { Highlight } from 'svelte-highlight';
	import { javascript } from 'svelte-highlight/languages';
	import { atomOneDark } from 'svelte-highlight/styles';

	let code;
	GeneratedCodeStore.subscribe((data) => {
		code = data;
	});

	function copyText() {
		const codeElement = document.getElementById('code');
		if (codeElement) {
			const textToCopy = codeElement.innerText;
			const tempTextArea = document.createElement('textarea');

			tempTextArea.value = textToCopy;
			document.body.appendChild(tempTextArea);
			tempTextArea.select();
			tempTextArea.setSelectionRange(0, 99999);
			document.execCommand('copy');
			document.body.removeChild(tempTextArea);
			const copyElement = document.getElementById('copybtn');
			if (copyElement) {
				copyElement.innerText = 'Copied';
				setTimeout(() => {
					copyElement.innerText = 'Copy';
				}, 2000);
			}
		}
	}
</script>

<svelte:head>
	{@html atomOneDark}
</svelte:head>

<div id="generate" class="bg-[#333333] w-[100%] max-h-[75vh] overflow-y-auto toggle-display">
	<button
		id="copybtn"
		on:click={copyText}
		class="absolute top-[10px] font-[500] right-[10px] px-[10px] py-[8px] z-[20] cursor-pointer hover:bg-[#cccccc] outline-none border-none rounded-lg text-[#101010] bg-[#dddddd] text-[0.8rem]"
	>
		Copy
	</button>
	<div class="codeContainer h-[100%] w-[100%]">
		<Highlight language={javascript} {code} />
	</div>
</div>
