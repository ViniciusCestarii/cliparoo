<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Header />

<main class="pt-[4rem] h-screen">
	{@render children()}
</main>
