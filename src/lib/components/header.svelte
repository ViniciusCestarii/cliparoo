<script>
	import { page } from '$app/stores';

	import NavDropdown from './nav-dropdown.svelte';
</script>

<header
	class="fixed top-0 h-16 pt-1 p-2 z-30 flex justify-between w-full items-center bg-base-100 border-accent/60 border-b-[0.125rem]"
>
	<a href="/" class:cursor-default={$page.url.pathname === '/'}>
		<h1 class="text-xl">Cliparoo</h1>
	</a>

	<div class="h-12">
		<NavDropdown />
	</div>
</header>
