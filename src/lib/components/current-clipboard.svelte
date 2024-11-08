<script>
	import { readText, } from '@tauri-apps/plugin-clipboard-manager';

let clipboardContent = $state("")

$effect(() => {
	const id = setInterval(async () => {
		clipboardContent = await readText();
	}, 200);

	return () => {
		clearInterval(id);
	};
});
</script>

<main>
	<h1>Clipboard: {clipboardContent}</h1>
</main>
