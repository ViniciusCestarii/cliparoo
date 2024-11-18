<script lang="ts">
	import cs from '$lib/cliparoo-state.svelte';
	import ClipboardEntry from '$lib/components/clipboard-entry.svelte';
	import VirtualList from '$lib/components/virtual-list.svelte';
</script>

<div class="h-[calc(100vh-4rem)]">
	{#if cs.clipboard.length === 0}
		<div class="flex flex-col items-center justify-center h-full text-center">
			<p class="text-lg">No clipboard entries</p>
			<p class="text-sm max-w-96">
				Clipboard entries will appear here when you copy something to your clipboard!
			</p>
		</div>
	{/if}
	<VirtualList items={cs.clipboard} height="100%" getKey={(entry) => entry.id}>
		{#snippet Children(entry)}
			<ClipboardEntry {entry} />
		{/snippet}
	</VirtualList>
</div>
