<script lang="ts">
	import ClipboardEntry from '$lib/components/clipboard-entry.svelte';
	import type { ClipboardEntry as ClipboardEntryType } from '$lib/types';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import ClipboardWindowBadge from '$lib/components/clipboard-window-badge.svelte';
	import ClipboardTypeBadge from '$lib/components/clipboard-type-badge.svelte';
	import cs from '$lib/cliparoo-state.svelte';

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

<div class="grid xs:grid-cols-[minmax(0,_12rem)_minmax(0,_1fr)] xs:gap-4">
	<div class="flex flex-col pt-1">
		<ThemeToggle />
		<div class="form-control">
			<div class="divider text-sm">Show</div>
			<label class="label cursor-pointer">
				<span class="label-text"><ClipboardWindowBadge window="Window" /></span>
				<input type="checkbox" bind:checked={cs.showWindowBadge} class="toggle toggle-primary" />
			</label>
			<label class="label cursor-pointer">
				<span class="label-text"><ClipboardTypeBadge type="text" /></span>
				<input type="checkbox" bind:checked={cs.showTypeBadge} class="toggle toggle-primary" />
			</label>
			<label class="label cursor-pointer">
				<span class="label-text">Timestamp</span>
				<input type="checkbox" bind:checked={cs.showTimestamp} class="toggle toggle-primary" />
			</label>
		</div>
	</div>

	<div>
		<div class="divider xs:divider-horizontal text-sm">Preview</div>
		<ClipboardEntry entry={entry1} />
		<ClipboardEntry entry={entry2} />
	</div>
</div>
