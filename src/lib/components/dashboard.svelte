<script lang="ts">
	import EntriesByType from './dashboard/entries-by-type.svelte';
	import EntriesOnLast_7Days from './dashboard/entries-on-last-7-days.svelte';
</script>

<div class="flex flex-col sm:grid sm:grid-cols-3 gap-2 px-2">
	<EntriesByType class="w-2/3 mx-auto sm:w-full sm:mx-0" />
	<EntriesOnLast_7Days class="sm:col-span-2" />
</div>
