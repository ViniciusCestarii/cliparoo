<script lang="ts">
	import ClipboardEntry from '../clipboard-entry.svelte';
	import type { ClipboardEntry as ClipboardEntryType } from '$lib/types';

	const entry: ClipboardEntryType = {
		id: Infinity,
		text: 'Hello, world!',
		window: 'Cliparoo',
		timestamp: new Date().toISOString(),
		type: 'text'
	};
</script>

<ClipboardEntry {entry} />
