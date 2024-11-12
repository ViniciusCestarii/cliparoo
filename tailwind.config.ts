import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import daisyui from "daisyui"

export const themes = ['dark', 'retro', 'cyberpunk', 'valentine', 'aqua'] as const;

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      screens: {
        xs: '20em',
        sm: '40em',
        md: '48em',
        lg: '64em',
        xl: '80em',
      },
    }
  },

	plugins: [typography, forms, daisyui],

	daisyui: {
		themes,
	}
} as Config;
