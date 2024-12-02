import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export const themes = [
	'dark',
	'light',
	'cupcake',
	'bumblebee',
	'emerald',
	'corporate',
	'synthwave',
	'retro',
	'cyberpunk',
	'valentine',
	'halloween',
	'garden',
	'forest',
	'aqua',
	'lofi',
	'pastel',
	'fantasy',
	'wireframe',
	'black',
	'luxury',
	'dracula',
	'cmyk',
	'autumn',
	'business',
	'acid',
	'lemonade',
	'night',
	'coffee',
	'winter',
	'dim',
	'nord',
	'sunset'
] as const;

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			screens: {
				xs: '20em',
				sm: '40em',
				md: '48em',
				lg: '64em',
				xl: '80em'
			}
		}
	},

	plugins: [daisyui],

	daisyui: {
		themes
	}
} as Config;
