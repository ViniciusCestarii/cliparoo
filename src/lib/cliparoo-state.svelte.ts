import { info } from "@tauri-apps/plugin-log";
import type { CliparooState as CliparooStateType, ClipboardEntry, CreateClipboardEntry } from "./types";

export class CliparooState {
	private _state = $state<CliparooStateType>(loadStateFromStorage());
	private _firstEntry = $state(this.getFirstClipboardEntry());

	get clipboard() {
		return this._state.clipboard;
	}
	get theme() {
		return this._state.theme;
	}
	set theme(value: CliparooStateType['theme']) {
		this._state.theme = value;
		this._saveState();
	}

	getFirstClipboardEntry() {
		return this._state.clipboard.length > 0 ? this._state.clipboard[0] : null;
	}

	isClipboardEmpty() {
		return this._state.clipboard.length === 0;
	}

	addClipboardEntry(baseEntry: CreateClipboardEntry) {

		// Prevent adding the same entry twice
		if (baseEntry.text === this._firstEntry?.text) {
			return;
		}

		const timestamp = new Date().toISOString();
		const type: ClipboardEntry["type"] = getType(baseEntry.text);

		const newEntry = { ...baseEntry, timestamp, type };

		info(`Pushing to clipboard ${Object.entries(newEntry).map(([key, value]) => `${key}: ${value}`).join(', ')}`);
		
		this._state.clipboard.unshift(newEntry);
		this._firstEntry = newEntry;

		this._saveState();
	}

	reset() {
		this._state = loadStateFromStorage();
		this._saveState();
	}

	private _saveState = () => saveStateToStorage(this._state);
}

const STATE_KEY = 'cliparooState';

const loadStateFromStorage = (): CliparooStateType => {
	const storedState = localStorage.getItem(STATE_KEY);
	return storedState ? JSON.parse(storedState) : {
		clipboard: [{
			text: 'Welcome to Cliparoo!',
			timestamp: new Date().toISOString(),
			type: 'text',
			window: "Super Big Window Title for Cliparoo test"
		}],
		theme: 'dark',
	};
};

const saveStateToStorage = (state: CliparooStateType) => {
	localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

const URL_REGEX = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/

const getType = (text: ClipboardEntry["text"]): ClipboardEntry["type"] => {
  if (text.match(URL_REGEX)) return 'url';
  return 'text';
}