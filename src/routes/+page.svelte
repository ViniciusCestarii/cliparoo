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

<div class="h-[calc(100vh-4rem)]">
	{#if cs.clipboard.length === 0}
		<div class="flex flex-col items-center justify-center h-full text-center">
			<p class="text-lg">No clipboard entries</p>
			<p class="text-sm max-w-96">
				Clipboard entries will appear here when you copy something to your clipboard!
			</p>
		</div>
	{/if}
	<VirtualList items={cs.clipboard} height="100%" getKey={(entry) => entry.id}>
		{#snippet Children(entry)}
			<ClipboardEntry {entry} />
		{/snippet}
	</VirtualList>
</div>
