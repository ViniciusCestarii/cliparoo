<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import '../app.css';
	import { invokeGetWindowName } from '$lib';
	import { readText } from '@tauri-apps/plugin-clipboard-manager';
	import cs from '$lib/cliparoo-state.svelte';
	
	let { children } = $props();

	// fix:
	// [2024-11-09][23:47:40][tao::platform_impl::platform::event_loop::runner][WARN] NewEvents emitted without explicit RedrawEventsCleared
	// [2024-11-09][23:47:40][tao::platform_impl::platform::event_loop::runner][WARN] RedrawEventsCleared emitted without explicit MainEventsCleared
	$effect(() => {
		const id = setInterval(async () => {
			const [clipboardContent, currentWindowName] = await Promise.all([
				await readText(),
				await invokeGetWindowName()
			]);

			const createdEntry = cs.addClipboardEntry({
				text: clipboardContent,
				window: currentWindowName
			});

			if (createdEntry) {
				window.scrollTo({ top: 0, behavior: 'smooth' });
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
