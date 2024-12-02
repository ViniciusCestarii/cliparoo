<script>
	import Section from './section.svelte';
	import cliparooMascot from '../../../static/cliparoo-mascot.jpeg';
	import CliparooPageExample from './cliparoo-page-example.svelte';
</script>

<Section id="home" class="hero max-w-full overflow-x-hidden bg-base-200">
	<div class="hero-content xl:max-w-screen-lg">
		<div class="flex flex-shrink-0 flex-col text-7xl font-bold">
			<div class="mb-16 flex flex-col pl-4 sm:mb-8 sm:pl-8">
				<span>Your</span><span>Smart</span> <span>Clipboard</span>
			</div>
			<img
				src={cliparooMascot}
				style="mask-size: contain; mask-repeat: no-repeat;"
				alt="Cliparoo Mascot"
				class="mask-squircle w-[calc(100vw-3rem)] sm:size-96"
			/>
		</div>
		<div class="-mr-36 hidden bg-base-100 sm:block">
			<CliparooPageExample />
		</div>
	</div>
</Section>
