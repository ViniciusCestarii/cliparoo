import type { CliparooState as CliparooStateType, CreateClipboardEntry } from "./types";

const defaultState: CliparooStateType = {
	clipboard: [],
	theme: 'dark',
}

export class CliparooState {
	private _state = $state<CliparooStateType>(defaultState);

	get clipboard() {
		return this._state.clipboard;
	}
	get theme() {
		return this._state.theme;
	}
	set theme(value: CliparooStateType['theme']) {
		this._state.theme = value;
	}

	getFirstClipboardEntry() {
		return this._state.clipboard.length > 0 ? this._state.clipboard[0] : null;
	}

	pushToClipboard(newEntry: CreateClipboardEntry) {

		const timestamp = new Date().toISOString();
		const type = 'text' // TODO: infer type from newEntry
		
		// If clipboard is empty, just add the new entry
		if (this._state.clipboard.length === 0) {
			this._state.clipboard.push({ ...newEntry, timestamp, type});
			return;
		}

		const firstEntry = this.getFirstClipboardEntry()!;

		// If new entry is different from the first entry, add
		if (newEntry.text !== firstEntry.text && newEntry.window !== firstEntry.window) {
			this._state.clipboard.push({ ...newEntry, timestamp, type});
		}
	}

	reset() {
		this._state = defaultState;
	}
}