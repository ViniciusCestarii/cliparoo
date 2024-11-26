<script>
	import { docState } from '$lib/state.svelte';
	import { themes } from '../../../../tailwind.config';
	import ThemePreview from './theme-preview.svelte';
	import Section from './section.svelte';
</script>

<Section id="features">
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each themes as theme}
			<label class="relative">
				<input
					data-theme={theme}
					type="radio"
					class="radio-primary radio absolute left-2 top-2"
					bind:group={docState.theme}
					value={theme}
					id={theme}
				/>
				<ThemePreview {theme} />
			</label>
		{/each}
	</div>
</Section>
