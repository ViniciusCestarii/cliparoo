<script>
	import { invokeGetWindowName } from '$lib/command.svelte';

	let currentWindowName = $state('');

	$effect(() => {
		const id = setInterval(async () => {
			currentWindowName = await invokeGetWindowName();
		}, 200);

		return () => {
			clearInterval(id);
		};
	});
</script>

<main>
	<h1>Window name: {currentWindowName}</h1>
</main>
