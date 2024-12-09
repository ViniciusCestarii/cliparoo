<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	interface NavDropdownProps extends HTMLAttributes<HTMLElement> {}

	let { class: className, ...props }: NavDropdownProps = $props();
</script>

<div {...props} class={cn('dropdown dropdown-end mb-72', className)}>
	<div
		tabIndex={0}
		role="button"
		aria-label="open menu"
		class="btn btn-circle btn-ghost m-1 focus:ring-2 ring-base-content"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-menu"
			><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line
				x1="4"
				x2="20"
				y1="18"
				y2="18"
			/></svg
		>
	</div>

	<ul
		class="dropdown-content bg-base-300 flex flex-col gap-2 rounded-box z-[1] w-52 p-2 shadow-2xl max-h-[calc(100vh-12rem)] overflow-y-auto"
	>
		{#snippet link(href: string, name: string)}
			<a
				{href}
				class="btn btn-ghost w-full justify-start {$page.url.pathname === href ? 'btn-active' : ''}"
				>{name}</a
			>
		{/snippet}
		{@render link('/', 'Clipboard')}
		{@render link('/dashboard', 'Dashboard')}
		{@render link('/configuration', 'Configurations')}
	</ul>
</div>
