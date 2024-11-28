<script>
	import { docState } from '$lib/state.svelte';
	import { themes } from '../../../../tailwind.config';
	import ThemePreview from './theme-preview.svelte';
	import Section from './section.svelte';
	import CliparooPageExample from './cliparoo-page-example.svelte';
</script>

<Section id="features">
	<h2 class="text-4xl font-bold">Why use Cliparoo?</h2>

	<h3 class="mt-8 text-3xl font-bold">🎨 Fancy Themes</h3>

	<p class="text-lg">
		Because life's too short for boring apps. Pick a theme that screams <b>you</b>! Or at least
		mumbles it.
	</p>

	<div class="grid grid-cols-3 gap-6 mt-4">
		<div class="col-span-2 -mt-1">
			<CliparooPageExample />
		</div>
		<div class="grid max-h-[44rem] grid-cols-1 overflow-y-auto">
			{#each themes as theme}
				<label class="relative p-2">
					<input
						data-theme={theme}
						type="radio"
						class="radio-primary radio absolute left-4 top-4"
						bind:group={docState.theme}
						value={theme}
						id={theme}
					/>
					<ThemePreview {theme} />
				</label>
			{/each}
		</div>
	</div>
</Section>
