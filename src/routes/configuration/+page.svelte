<script lang="ts">
	import ClipboardEntry from '$lib/components/clipboard-entry.svelte';
	import type { ClipboardEntry as ClipboardEntryType } from '$lib/types';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';

	const entry1: ClipboardEntryType = {
		id: Infinity,
		text: 'Hello, world!',
		window: 'Cliparoo',
		timestamp: new Date().toISOString(),
		type: 'text'
	};

	const entry2: ClipboardEntryType = {
		id: Infinity,
		text: 'https://github.com/ViniciusCestarii/Cliparoo',
		window: 'Cliparoo',
		timestamp: new Date().toISOString(),
		type: 'url'
	};
</script>

<div class="grid sm:grid-cols-4">
	<div class="flex flex-col pt-1">
		<ThemeToggle />
	</div>

	<div class="col-span-3">
		<div class="divider sm:divider-horizontal text-sm">Preview</div>
		<ClipboardEntry entry={entry1} />
		<ClipboardEntry entry={entry2} />
	</div>
</div>
