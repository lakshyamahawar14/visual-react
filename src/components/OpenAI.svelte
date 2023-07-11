<script context="module">
	import { Configuration, OpenAIApi } from 'openai';

	export function configureOpenAI() {
		const configuration = new Configuration({
			apiKey: process.env.API_KEY
		});
		const openai = new OpenAIApi(configuration);
		return openai;
	}
</script>
