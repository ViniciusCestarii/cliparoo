<script lang="ts">
	import { focus } from '$lib/actions.svelte';
	import SearchFilterHelp from './search-filter-help.svelte';

	interface SearchInputProps {
		search: string;
	}

	let { search = $bindable() }: SearchInputProps = $props();

	let searchBlock: HTMLElement | null = $state(null);

	let displaySearch = $state(false);

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
