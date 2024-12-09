<script lang="ts">
	import cs from '$lib/cliparoo-state.svelte';
	import ClipboardEntry from '$lib/components/clipboard-entry.svelte';
	import SearchInput from '$lib/components/search-input.svelte';
	import VirtualList from '$lib/components/virtual-list.svelte';
	import { filterClipboard } from '$lib/utils';

	let search = $state('');

	let filteredClipboard = $derived(filterClipboard(cs.clipboard, search));

</script>

<div class="h-[calc(100vh-4rem)] relative">
	<SearchInput bind:search />
	<VirtualList items={filteredClipboard} height="100%" getKey={(entry) => entry.id}>
		{#snippet Children(entry)}
			<ClipboardEntry {entry} />
		{/snippet}
	</VirtualList>
</div>
