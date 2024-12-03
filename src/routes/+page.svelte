<script lang="ts">
	import { focus } from '$lib/actions.svelte';
	import cs from '$lib/cliparoo-state.svelte';
	import ClipboardEntry from '$lib/components/clipboard-entry.svelte';
	import VirtualList from '$lib/components/virtual-list.svelte';
	import { cn } from '$lib/utils';

	let search = $state('');

	let displaySearch = $state(false);

	let filteredClipboard = $derived.by(() => {
		const upperSearch = search.toUpperCase();

		return cs.clipboard.filter(
			(entry) =>
				entry.text.toUpperCase().includes(upperSearch) ||
				entry.window.toUpperCase().includes(upperSearch) ||
				entry.type.toUpperCase().includes(upperSearch)
		);
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.ctrlKey && event.key === 'f') {
			event.preventDefault();
			displaySearch = !displaySearch;
		}
	}

	$effect(() => {
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

{#if displaySearch}
	<div class="flex px-2 h-12 mb-1">
		<input
			use:focus
			onblur={() => (displaySearch = false)}
			placeholder="Search clipboard"
			class="w-full bg-base-100 px-2 outline-none rounded-btn rounded-t-none focus-within:ring-2 ring-accent/70"
			bind:value={search}
		/>
	</div>
{/if}

<div class={cn('h-[calc(100vh-4rem)]', displaySearch && 'h-[calc(100vh-7.25rem)]')}>
	{#if cs.clipboard.length === 0}
		<div class="flex flex-col items-center justify-center h-full text-center">
			<p class="text-lg">No clipboard entries</p>
			<p class="text-sm max-w-96">
				Clipboard entries will appear here when you copy something to your clipboard!
			</p>
		</div>
	{/if}
	<VirtualList items={filteredClipboard} height="100%" getKey={(entry) => entry.id}>
		{#snippet Children(entry)}
			<ClipboardEntry {entry} />
		{/snippet}
	</VirtualList>
</div>
