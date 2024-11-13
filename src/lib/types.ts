import { themes } from  "../../tailwind.config"

export type ClipboardEntry = {
	id: number;
  window: string;
	type: 'text' | 'image' | 'url';
	text: string;
	timestamp: string;
}

export type CreateClipboardEntry = Omit<ClipboardEntry, 'timestamp' | 'type' | 'id'>;

export type CliparooState = {
	clipboard: ClipboardEntry[];
	theme: typeof themes[number];
}
