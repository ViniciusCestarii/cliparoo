<script lang="ts">
	import { focus } from '$lib/actions.svelte';
	import cs from '$lib/cliparoo-state.svelte';
	import ClipboardEntry from '$lib/components/clipboard-entry.svelte';
	import SearchFilterHelp from '$lib/components/search-filter-help.svelte';
	import VirtualList from '$lib/components/virtual-list.svelte';

	let search = $state('');
	let searchBlock: HTMLElement | null = $state(null);

	let displaySearch = $state(false);

	function parseFilter(filterStr: string) {
		// Ensure values with spaces are quoted
		filterStr = filterStr.replace(/(\w+):([^"\s]+)(?=\s|$)/g, '$1:"$2"'); // Add quotes to non-quoted values with spaces

		const filters: Record<string, string> = {};
		const regex = /(\w+):"([^"]*)"/g;
		let match;

		while ((match = regex.exec(filterStr)) !== null) {
			const key = match[1];
			const value = match[2];
			filters[key] = value;
		}

		return filters;
	}

	let filteredClipboard = $derived.by(() => {
		const upperSearch = search.toUpperCase();

		const isNoFilter = upperSearch.startsWith('NOFILTER ');

		const adjustedSearch = isNoFilter ? upperSearch.slice(9) : upperSearch;

		const filters = isNoFilter ? {} : parseFilter(adjustedSearch);

		if (Object.keys(filters).length > 0) {
			return cs.clipboard.filter((entry) => {
				return Object.entries(filters).every(([key, value]) => {
					if (key === 'TYPE') {
						return entry.type.toUpperCase().includes(value);
					}

					if (key === 'WINDOW') {
						return entry.window.toUpperCase().includes(value);
					}

					return entry.text.toUpperCase().includes(value);
				});
			});
		}

		return cs.clipboard.filter(
			(entry) =>
				entry.text.toUpperCase().includes(adjustedSearch) ||
				entry.window.toUpperCase().includes(adjustedSearch) ||
				entry.type.toUpperCase().includes(adjustedSearch)
		);
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.ctrlKey && event.key === 'f') {
			event.preventDefault();
			displaySearch = !displaySearch;
			search = '';
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (search) return;
		if (searchBlock && !searchBlock.contains(event.target as Node)) {
			displaySearch = false;
		}
	}

	$effect(() => {
		window.addEventListener('keydown', handleKeydown);
		document.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="h-[calc(100vh-4rem)] relative">
	{#if displaySearch}
		<div bind:this={searchBlock} class="flex px-2 h-12 w-full z-40 mb-1 absolute -top-14 left-0">
			<input
				use:focus
				placeholder="Search clipboard"
				class="w-full bg-base-100 px-2 outline-none rounded-btn ring-2 ring-accent/70"
				bind:value={search}
			/>
			<SearchFilterHelp class="absolute right-3 top-2 bg-base-100 hover:bg-base-300 btn-sm" />
		</div>
	{/if}
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
