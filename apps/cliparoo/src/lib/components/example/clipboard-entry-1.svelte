<script lang="ts">
	import ClipboardEntry from '../clipboard-entry.svelte';
	import type { ClipboardEntry as ClipboardEntryType } from '$lib/types';

	const entry: ClipboardEntryType = {
		id: Infinity,
		text: 'https://github.com/ViniciusCestarii/cliparoo',
		window: 'Cliparoo',
		timestamp: new Date().toISOString(),
		type: 'url'
	};
</script>

<ClipboardEntry {entry} />
