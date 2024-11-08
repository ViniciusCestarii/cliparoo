<script lang="ts">
	import { GlobalState, preventDefault } from '$lib';
	import CurrentClipboard from '$lib/components/current-clipboard.svelte';
	import CurrentWindow from '$lib/components/current-window.svelte';

	const gs = new GlobalState();

	$inspect(gs.greet, gs.name);

	const onsubmit = preventDefault(() => gs.nlen && gs.submit());
	const onclick = () => gs.reset();
</script>

<div class="hero bg-base-200 min-h-screen">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<CurrentClipboard />
			<CurrentWindow />
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
		<div class="dropdown mb-72">
			<div tabIndex={0} role="button" class="btn m-1">
				Theme
				<svg
					width="12px"
					height="12px"
					class="inline-block h-2 w-2 fill-current opacity-60"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 2048 2048">
					<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
				</svg>
			</div>
			<ul tabIndex={0} class="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
				<li>
					<input
						type="radio"
						name="theme-dropdown"
						class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
						aria-label="Default"
						value="dark" />
				</li>
				<li>
					<input
						type="radio"
						name="theme-dropdown"
						class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
						aria-label="Retro"
						value="retro" />
				</li>
				<li>
					<input
						type="radio"
						name="theme-dropdown"
						class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
						aria-label="Cyberpunk"
						value="cyberpunk" />
				</li>
				<li>
					<input
						type="radio"
						name="theme-dropdown"
						class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
						aria-label="Valentine"
						value="valentine" />
				</li>
				<li>
					<input
						type="radio"
						name="theme-dropdown"
						class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
						aria-label="Aqua"
						value="aqua" />
				</li>
			</ul>
		</div>
	</div>
</div>
