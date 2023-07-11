<script context="module">
	import { Configuration, OpenAIApi } from 'openai';

	export const API_KEY = process.env.API_KEY;

	export function configureOpenAI() {
		const configuration = new Configuration({
			apiKey: API_KEY
		});
		const openai = new OpenAIApi(configuration);
		return openai;
	}
</script>
