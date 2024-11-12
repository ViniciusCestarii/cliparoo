import { info } from "@tauri-apps/plugin-log";
import type { CliparooState as CliparooStateType, ClipboardEntry, CreateClipboardEntry } from "./types";

const defaultState: CliparooStateType = {
	clipboard: [{
		text: 'Welcome to Cliparoo!',
		timestamp: new Date().toISOString(),
		type: 'text',
		window: "Cliparoo"
	}],
	theme: 'dark',
}

export class CliparooState {
	private _state = $state<CliparooStateType>(defaultState);
	private _firstEntry = $state(this.getFirstClipboardEntry());

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

	isClipboardEmpty() {
		return this._state.clipboard.length === 0;
	}

	pushToClipboard(baseEntry: CreateClipboardEntry) {

		// Prevent adding the same entry twice
		if (baseEntry.text === this._firstEntry?.text) {
			return
		}

		const timestamp = new Date().toISOString();
		const type: ClipboardEntry["type"] = 'text' // TODO: infer type from newEntry

		const newEntry = { ...baseEntry, timestamp, type };

		info(`Pushing to clipboard ${Object.entries(newEntry).map(([key, value]) => `${key}: ${value}`).join(', ')}`);
		
		this._state.clipboard.push(newEntry);
		this._firstEntry = newEntry;
	}

	reset() {
		this._state = defaultState;
	}
}