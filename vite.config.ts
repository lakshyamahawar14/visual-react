import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv'
dotenv.config();

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5100,
		strictPort: false
	},
	define: {
		"process.env.API_KEY": `"${process.env.API_KEY}"`,
	  },
});
