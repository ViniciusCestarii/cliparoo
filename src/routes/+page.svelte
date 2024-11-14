<script lang="ts">
	import { invokeGetWindowName } from '$lib';
	import cs from '$lib/cliparoo-state.svelte';
	import ClipboardEntry from '$lib/components/clipboard-entry.svelte';
	import VirtualList from '$lib/components/virtual-list.svelte';
	import { readText } from '@tauri-apps/plugin-clipboard-manager';

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

<VirtualList items={cs.clipboard} height="100%" getKey={(entry) => entry.id}>
	{#snippet Children(entry)}
		<ClipboardEntry {entry} class="m-2" />
	{/snippet}
</VirtualList>
