<script lang="ts">
	import { GlobalState, preventDefault } from '$lib';

	const gs = new GlobalState();

	$inspect(gs.greet, gs.name);

	const onsubmit = preventDefault(() => gs.nlen && gs.submit());
	const onclick = () => gs.reset();
</script>

<div class="hero bg-base-200 min-h-screen">
	<div class="hero-content text-center">
		<div class="max-w-md">
			{#if gs.greet}
				<div class="flex flex-col items-center">
					<h1 class="text-3xl font-bold mb-4">{gs.greet}</h1>
					<p><small class="text-sm">(from Rust side)</small></p>
					<button class="btn btn-primary m-2" {onclick}>Reset</button>
				</div>
			{:else}
				<h1 class="text-5xl font-bold mb-4">Hello World!</h1>
				<label class="form-control w-full max-w-xs">
					<div class="label">
						<span class="label-text">What is your name?</span>
					</div>

					<form {onsubmit}>
						<input
							bind:value={gs.name}
							type="text"
							placeholder="Your name"
							class="input input-bordered w-full max-w-xs"
						/>

						<button disabled={!gs.nlen} class="btn btn-primary m-2">Submit</button>
					</form>
				</label>
			{/if}
			<button onclick={() => {
				document.body.setAttribute("data-theme", 'halloween');
			}} class="btn btn-secondary m-2">Toggle Theme</button>
		</div>
	</div>
</div>
