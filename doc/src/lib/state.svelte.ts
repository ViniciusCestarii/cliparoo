import { themes } from '../../../tailwind.config';

const STATE_KEY = 'cliparooDocState';

export type Theme = (typeof themes)[number];

type DocStateType = {
	dark?: boolean;
	theme: Theme;
};

const initialState: DocStateType = {
	theme: themes[0]
};

class DocState {
	#state: DocStateType = $state(loadStateFromStorage());

	get theme() {
		return this.#state.theme;
	}

	set theme(value: Theme) {
		this.#state.theme = value;
		setTheme(value);
		this._saveState();
	}

	private _saveState = () => saveStateToStorage(this.#state);
}

export const loadStateFromStorage = () => {
	const storedState = localStorage.getItem(STATE_KEY);
	const state: DocStateType = storedState ? JSON.parse(storedState) : initialState;

	setThemeHtml(!!state.dark);
	setTheme(state.theme);

	return state;
};

export const saveStateToStorage = (state: DocStateType) => {
	localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

const setThemeHtml = (dark: boolean) => {
	console.log('saving state', dark);
	document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
};

const setTheme = (theme: Theme) => {
	document.documentElement.setAttribute('data-theme', theme);
};

export const docState = new DocState();
