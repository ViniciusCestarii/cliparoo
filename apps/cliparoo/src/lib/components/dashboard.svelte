<script lang="ts">
	import EntriesByType from './dashboard/EntriesByType.svelte';
	import EntriesOnLastWeek from './dashboard/EntriesOnLastWeek.svelte';
</script>

<div class="flex flex-col sm:grid sm:grid-cols-3 gap-2 px-2">
	<EntriesByType class="w-2/3 mx-auto sm:w-full sm:mx-0" />
	<EntriesOnLastWeek class="sm:col-span-2" />
</div>
