<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import '../app.css';
	import { invokeGetWindowName } from '$lib';
	import { readText, readImage } from '@tauri-apps/plugin-clipboard-manager';
	import cs from '$lib/cliparoo-state.svelte';

	let { children } = $props();

	// fix:
	// [2024-11-09][23:47:40][tao::platform_impl::platform::event_loop::runner][WARN] NewEvents emitted without explicit RedrawEventsCleared
	// [2024-11-09][23:47:40][tao::platform_impl::platform::event_loop::runner][WARN] RedrawEventsCleared emitted without explicit MainEventsCleared
	$effect(() => {
		const id = setInterval(async () => {
			try {
				const [clipboardText, currentWindowName] = await Promise.all([
					readText(),
					invokeGetWindowName()
				]);

				const createdEntry = cs.addClipboardEntry({
					text: clipboardText,
					window: currentWindowName
				});

				if (createdEntry) {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}
			} catch (error) {
				function toBase64(imageBlob: Blob) {
					return new Promise((resolve, reject) => {
						const reader = new FileReader();
						reader.onloadend = () => resolve(reader.result); // This gives the base64 string
						reader.onerror = reject;
						reader.readAsDataURL(imageBlob); // Read the Blob as base64
					});
				}

				// Assuming `clipboardImage` is a Blob or Image object
				const [clipboardImage, currentWindowName] = await Promise.all([
					readImage(), // This should return a Blob or Image object
					invokeGetWindowName()
				]);

				const blob = new Blob([await clipboardImage.rgba()], { type: 'image' });

				const imageBase64 = await toBase64(blob); // Convert the image to base64

				// Add clipboard entry with base64 image
				const createdEntry = cs.addClipboardEntry({
					text: imageBase64,
					window: currentWindowName
				});

				if (createdEntry) {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}
			}
		}, 200);

		return () => {
			clearInterval(id);
		};
	});
</script>

<Header />

<main class="pt-[4rem]">
	{@render children()}
</main>
