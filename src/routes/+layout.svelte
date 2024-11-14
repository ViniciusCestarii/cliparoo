<script lang="ts">
	import NavDropdown from '$lib/components/nav-dropdown.svelte';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<header
	class="fixed top-0 h-16 pt-1 p-2 z-30 flex justify-between w-full items-center bg-base-100 border-accent/60 border-b-[0.125rem]"
>
	<h1 class="text-xl">Cliparoo</h1>

	<div class="h-12">
		<NavDropdown />
	</div>
</header>

<main class="pt-[4.5rem]">
	{@render children()}
</main>
