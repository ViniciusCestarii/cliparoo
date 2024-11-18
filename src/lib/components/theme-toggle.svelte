<script lang="ts">
	import cs from '$lib/cliparoo-state.svelte';
	import { themes } from '../../../tailwind.config';
</script>

<div class="dropdown mb-72">
	<div tabIndex={0} role="button" class="btn m-1 focus:ring-2 ring-base-content">
		Theme
		<svg
			width="12px"
			height="12px"
			class="inline-block h-2 w-2 fill-current opacity-60"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 2048 2048"
		>
			<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
		</svg>
	</div>

	<ul
		class="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl max-h-[calc(100vh-12rem)] overflow-y-auto"
	>
		{#each themes as theme}
			<input
				type="radio"
				name="theme-dropdown"
				class="theme-controller btn btn-sm btn-block btn-ghost justify-start capitalize object-right"
				checked={theme === cs.theme}
				onclick={() => (cs.theme = theme)}
				aria-label={theme}
				value={theme}
			/>
		{/each}
	</ul>
</div>
