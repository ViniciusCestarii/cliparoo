import { info } from '@tauri-apps/plugin-log';
import type {
	CliparooState as CliparooStateType,
	ClipboardEntry,
	CreateClipboardEntry,
	Theme
} from './types';
import { binarySearch } from './search';

class CliparooState {
	#state = $state<CliparooStateType>(loadStateFromStorage());
	#ignoreNext = $state<null | string>(this.getFirstClipboardEntry()?.text ?? null);
	#firstSessionCopy = $state<boolean>(true);

	get clipboard() {
		return this.#state.clipboard;
	}
	get theme() {
		return this.#state.config.theme;
	}
	get showWindowBadge() {
		return this.#state.config.showWindowBadge;
	}
	get showTypeBadge() {
		return this.#state.config.showTypeBadge;
	}
	get showTimestamp() {
		return this.#state.config.showTimestamp;
	}
	set theme(value: Theme) {
		this.#state.config.theme = value;
		document.documentElement.setAttribute('data-theme', value);
		this._saveState();
	}
	set showWindowBadge(value: boolean) {
		this.#state.config.showWindowBadge = value;
		this._saveState();
	}
	set showTypeBadge(value: boolean) {
		this.#state.config.showTypeBadge = value;
		this._saveState();
	}
	set showTimestamp(value: boolean) {
		this.#state.config.showTimestamp = value;
		this._saveState();
	}

	getFirstClipboardEntry() {
		return this.#state.clipboard.length > 0 ? this.#state.clipboard[0] : null;
	}

	isClipboardEmpty() {
		return this.#state.clipboard.length === 0;
	}

	addClipboardEntry(baseEntry: CreateClipboardEntry) {
		// Prevent adding the same entry twice
		if (baseEntry.text === this.#ignoreNext) {
			this.#firstSessionCopy = false;
			return null;
		}

		const timestamp = new Date().toISOString();
		const type: ClipboardEntry['type'] = getType(baseEntry.text);
		const id = new Date(timestamp).getTime();
		const window = this.#firstSessionCopy ? 'Unknown' : baseEntry.window;

		const newEntry = { ...baseEntry, window, id, timestamp, type };

		info(
			`Pushing to clipboard ${Object.entries(newEntry)
				.map(([key, value]) => `${key}: ${value}`)
				.join(', ')}`
		);

		this.#state.clipboard.unshift(newEntry);
		this.#ignoreNext = newEntry.text;
		this.#firstSessionCopy = false;

		this._saveState();

		return newEntry;
	}

	ignoreNext(text: string) {
		this.#ignoreNext = text;
	}

	deleteClipboardEntry(id: number) {
		const index = binarySearch(this.#state.clipboard, id, (entry) => entry.id, true);

		if (index !== -1) {
			this.#state.clipboard.splice(index, 1);
			this._saveState();
			info(`Entry with id ${id} deleted from clipboard`);
		} else {
			info(`Entry with id ${id} not found`);
		}
	}

	reset() {
		this.#state = initialState;
		this._saveState();
	}

	private _saveState = () => saveStateToStorage(this.#state);
}

const STATE_KEY = 'cliparooState';

const loadStateFromStorage = (): CliparooStateType => {
	const storedState = localStorage.getItem(STATE_KEY);
	const state: CliparooStateType = storedState ? JSON.parse(storedState) : initialState;

	document.documentElement.setAttribute('data-theme', state.config.theme);

	return state;
};

const saveStateToStorage = (state: CliparooStateType) => {
	localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

const URL_REGEX =
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const getType = (text: ClipboardEntry['text']): ClipboardEntry['type'] => {
	const cleanText = text.trim();
	if (URL_REGEX.exec(cleanText)) return 'url';
	return 'text';
};

const initialState: CliparooStateType = {
	clipboard: [
		{
			id: 0,
			window: 'Cliparoo',
			type: 'text',
			text: 'Welcome to Cliparoo!',
			timestamp: new Date().toISOString()
		}
	],
	config: {
		theme: 'dark',
		showTimestamp: true,
		showTypeBadge: true,
		showWindowBadge: true
	}
};

const cs = new CliparooState();

export default cs;
