import { info } from '@tauri-apps/plugin-log';
import type {
	CliparooState as CliparooStateType,
	ClipboardEntry,
	CreateClipboardEntry
} from './types';
import { binarySearch } from './search';

class CliparooState {
	#state = $state<CliparooStateType>(loadStateFromStorage());
	#firstEntry = $state(this.getFirstClipboardEntry());

	get clipboard() {
		return this.#state.clipboard;
	}
	get theme() {
		return this.#state.theme;
	}
	set theme(value: CliparooStateType['theme']) {
		this.#state.theme = value;
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
		if (baseEntry.text === this.#firstEntry?.text) {
			return;
		}

		const timestamp = new Date().toISOString();
		const type: ClipboardEntry['type'] = getType(baseEntry.text);
		const id = new Date(timestamp).getTime();

		const newEntry = { ...baseEntry, id, timestamp, type };

		info(
			`Pushing to clipboard ${Object.entries(newEntry)
				.map(([key, value]) => `${key}: ${value}`)
				.join(', ')}`
		);

		this.#state.clipboard.unshift(newEntry);
		this.#firstEntry = newEntry;

		this._saveState();
	}

	deleteClipboardEntry(id: number) {
		const index = binarySearch(this.#state.clipboard, id, (entry) => entry.id, true);

		if (index !== -1) {
			this.#state.clipboard.splice(index, 1);
			this.#firstEntry = this.getFirstClipboardEntry();
			this._saveState();
			info(`Entry with id ${id} deleted from clipboard`);
		} else {
			info(`Entry with id ${id} not found`);
		}
	}

	reset() {
		this.#state = {
			...this.#state,
			clipboard: []
		};
		this._saveState();
	}

	private _saveState = () => saveStateToStorage(this.#state);
}

const STATE_KEY = 'cliparooState';

const loadStateFromStorage = (): CliparooStateType => {
	const storedState = localStorage.getItem(STATE_KEY);
	return storedState
		? JSON.parse(storedState)
		: {
				clipboard: [
					{
						id: 0,
						text: 'Welcome to Cliparoo!',
						timestamp: new Date().toISOString(),
						type: 'text',
						window: 'Super Big Window Title for Cliparoo test'
					}
				],
				theme: 'dark'
			};
};

const saveStateToStorage = (state: CliparooStateType) => {
	localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

const URL_REGEX =
	/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;

const getType = (text: ClipboardEntry['text']): ClipboardEntry['type'] => {
	if (URL_REGEX.exec(text)) return 'url';
	return 'text';
};

const cs = new CliparooState();

export default cs;
