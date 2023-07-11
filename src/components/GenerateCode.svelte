<script context="module">
	import { GeneratedCodeStore, OpenAPIStore, getCanvasStore } from '../stores/stores';
	import { allCards } from './BottombarCards.svelte';

	let openaiObj;
	OpenAPIStore.subscribe((data) => {
		openaiObj = data;
	});

	export async function generateCode() {
		const canvasData = getCanvasStore();
		const { drawables, cardMap, cardIdMap, cardCount } = canvasData;
		if (drawables.length === 0) {
			return;
		}
		let canvasQueryString =
			'This is the pseudocode in form of string of commands for React. You have to review each word the following string of commands, find a relation between them and generate the full code. You have to do exactly what is asked. You have to utilize the whole information given in the string of commands. ***You do not have to include unnecessary code apart from asked***.\n';

		drawables.forEach((drawable) => {
			const cards = drawable.cards;
			const texts = drawable.inputs;
			let inputCardName = allCards[cardIdMap[cards.input]].name;
			let inputCardText = '';
			texts.input.forEach((text, index) => {
				if (index === texts.input.length - 1) {
					inputCardText += `and ${text.name} is "${text.value}"`;
				} else {
					inputCardText += `${text.name} is "${text.value}", `;
				}
			});

			let outputCardName = allCards[cardIdMap[cards.output]].name;
			let outputCardText = '';
			texts.output.forEach((text, index) => {
				if (index === texts.output.length - 1) {
					outputCardText += `and ${text.name} is "${text.value}"`;
				} else {
					outputCardText += `${text.name} is "${text.value}", `;
				}
			});
			let inputCardQueryString = `${inputCardName}, whose ${inputCardText}`;
			let outputCardQueryString = `${outputCardName}, whose ${outputCardText}`;
			canvasQueryString += `${outputCardQueryString}, is inside ${inputCardQueryString}.\n`;
		});

		canvasQueryString.trim();
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + String(process.env.API_KEY)
			},
			body: JSON.stringify({
				prompt: canvasQueryString,
				temperature: 0.1,
				max_tokens: 30,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0.5,
				stop: ['"""']
			})
		};

		try {
			fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
				.then((response) => response.json())
				.then((data) => {
					if (data.choices) {
						const responseText = data.choices[0].text;
						GeneratedCodeStore.update((prevCode) => {
							return responseText.slice(1);
						});
					} else {
						GeneratedCodeStore.update((prevCode) => {
							return 'server down...';
						});
					}
				})
				.catch((err) => {
					console.log('Ran out of tokens for today! Try tomorrow!');
				});
		} catch (error) {
			console.log(error);
		}

		return 'Loading...';
	}
</script>
