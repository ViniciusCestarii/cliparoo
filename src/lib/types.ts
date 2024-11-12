import { themes } from  "../../tailwind.config"

export type ClipboardEntry = {
  window: string;
	type: 'text' | 'image' | 'url';
	text: string;
	timestamp: string;
}

export type CreateClipboardEntry = Omit<ClipboardEntry, 'timestamp' | 'type'>;

export type CliparooState = {
	clipboard: ClipboardEntry[];
	theme: typeof themes[number];
}
