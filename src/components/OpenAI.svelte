<script context="module">
	import { Configuration, OpenAIApi } from 'openai';

	export function configureOpenAI() {
		console.log('chorle api key: ', process.env.API_KEY);
		const configuration = new Configuration({
			apiKey: process.env.API_KEY
		});
		const openai = new OpenAIApi(configuration);
		return openai;
	}
</script>
