<script lang="ts">
	import ClipboardEntry from '$lib/components/clipboard-entry.svelte';
	import type { ClipboardEntry as ClipboardEntryType } from '$lib/types';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import ClipboardWindowBadge from '$lib/components/clipboard-window-badge.svelte';
	import ClipboardTypeBadge from '$lib/components/clipboard-type-badge.svelte';
	import cs from '$lib/cliparoo-state.svelte';
	import ClipboardEntry_1 from '$lib/components/example/clipboard-entry-1.svelte';
	import ClipboardEntry_2 from '$lib/components/example/clipboard-entry-2.svelte';
</script>

<div
	class="h-[calc(100vh-4rem)] overflow-auto grid xs:grid-cols-[minmax(0,_12rem)_minmax(0,_1fr)] xs:gap-4"
>
	<div class="flex flex-col pt-1">
		<ThemeToggle />
		<div class="form-control">
			<div class="divider text-sm">Show</div>
			<label class="label cursor-pointer" title="Toggle window badge visibility">
				<span class="label-text"><ClipboardWindowBadge window="Window" /></span>
				<input type="checkbox" bind:checked={cs.showWindowBadge} class="toggle toggle-primary" />
			</label>
			<label class="label cursor-pointer" title="Toggle type badge visibility">
				<span class="label-text"><ClipboardTypeBadge type="text" /></span>
				<input type="checkbox" bind:checked={cs.showTypeBadge} class="toggle toggle-primary" />
			</label>
			<label class="label cursor-pointer" title="Toggle timestamp visibility">
				<span class="label-text">Timestamp</span>
				<input type="checkbox" bind:checked={cs.showTimestamp} class="toggle toggle-primary" />
			</label>
		</div>
		<div class="form-control">
			<div class="divider text-sm">Acessibility</div>
			<label class="label cursor-pointer" title="Toggle remove motion">
				<span class="label-text">Remove motion</span>
				<input type="checkbox" bind:checked={cs.removeMotion} class="toggle toggle-primary" />
			</label>
		</div>
	</div>

	<div>
		<div class="divider xs:divider-horizontal text-sm">Preview</div>
		<ClipboardEntry_1 />
		<ClipboardEntry_2 />
	</div>
</div>
