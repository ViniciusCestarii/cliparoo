import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import { themes } from '../tailwind.config';

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
