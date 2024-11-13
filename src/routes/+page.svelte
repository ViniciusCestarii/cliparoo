<script lang="ts">
	import { invokeGetWindowName } from '$lib';
	import { CliparooState } from '$lib/cliparoo-state.svelte';
	import ClipboardEntry from '$lib/components/clipboard-entry.svelte';
	import { readText } from '@tauri-apps/plugin-clipboard-manager';

	const cs = new CliparooState();

	// fix:
	// [2024-11-09][23:47:40][tao::platform_impl::platform::event_loop::runner][WARN] NewEvents emitted without explicit RedrawEventsCleared
	// [2024-11-09][23:47:40][tao::platform_impl::platform::event_loop::runner][WARN] RedrawEventsCleared emitted without explicit MainEventsCleared
	$effect(() => {
		const id = setInterval(async () => {
			const [clipboardContent, currentWindowName] = await Promise.all([
				await readText(),
				await invokeGetWindowName()
			]);

			cs.addClipboardEntry({ text: clipboardContent, window: currentWindowName });
		}, 200);

		return () => {
			clearInterval(id);
		};
	});
</script>

<ul class="flex flex-col space-y-2 px-2">
	{#each cs.clipboard as entry (entry.timestamp)}
		<ClipboardEntry {entry} />
	{/each}
</ul>
