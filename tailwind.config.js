/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		screens: {
			sm: { max: '675px' },
			usm: { max: '450px' }
		}
	},
	plugins: []
};
