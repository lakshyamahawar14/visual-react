<script context="module">
	import { Configuration, OpenAIApi } from 'openai';

	export const API_KEY = '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';

	export function configureOpenAI() {
		const configuration = new Configuration({
			apiKey: API_KEY
		});
		const openai = new OpenAIApi(configuration);
		return openai;
	}
</script>
