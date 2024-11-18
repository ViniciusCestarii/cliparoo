import type { Component } from 'svelte';
import { themes } from '../../tailwind.config';

export type ClipboardEntry = {
	id: number;
	window: string;
	type: 'text' | 'image' | 'url';
	text: string;
	timestamp: string;
};

export type Theme = (typeof themes)[number];

export type CreateClipboardEntry = Omit<ClipboardEntry, 'timestamp' | 'type' | 'id'>;

export type CliparooState = {
	clipboard: ClipboardEntry[];
	config: {
		theme: Theme;
		showWindowBadge: boolean;
		showTypeBadge: boolean;
		showTimestamp: boolean;
	};
};

export type Props<T extends Component<any, any, any>> = Parameters<T>[1];
