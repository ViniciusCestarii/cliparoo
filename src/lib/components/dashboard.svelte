<script lang="ts">
	import EntriesByType from './dashboard/EntriesByType.svelte';
	import EntriesOnLastWeek from './dashboard/EntriesOnLastWeek.svelte';
</script>

<div class="grid grid-cols-3">
	<EntriesByType />
	<EntriesOnLastWeek />
</div>
