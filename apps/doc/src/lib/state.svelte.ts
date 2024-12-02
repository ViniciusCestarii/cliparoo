import type { themes } from '../../tailwind.config';
import { getUserPreferredColorScheme } from './utils';

const STATE_KEY = 'cliparooDocState';

export type Theme = (typeof themes)[number];

type DocStateType = {
	dark?: boolean;
	theme: Theme;
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

const initialState: DocStateType = {
	theme: getUserPreferredColorScheme()
};

export const loadStateFromStorage = () => {
	const storedState = localStorage.getItem(STATE_KEY);
	const state: DocStateType = storedState ? JSON.parse(storedState) : initialState;

	setTheme(state.theme);

	return state;
};

export const saveStateToStorage = (state: DocStateType) => {
	localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

const setTheme = (theme: Theme) => {
	document.documentElement.setAttribute('data-theme', theme);
};

export const docState = new DocState();
