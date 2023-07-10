<script>
	import { GeneratedCodeStore } from '../stores/stores';

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
		}
	}
</script>

<div id="generate" class="bg-[#333333] w-[100%] toggle-display">
	<button
		on:click={copyText}
		class="absolute top-[10px] font-[500] right-[10px] px-[10px] py-[8px] z-[20] cursor-pointer hover:bg-[#cccccc] outline-none border-none rounded-lg text-[#101010] bg-[#dddddd] text-[0.8rem]"
	>
		Copy
	</button>
	<div class="codeContainer">
		<p id="code" class="text-[#fcfcfc] p-[20px] code">{code}</p>
	</div>
</div>
