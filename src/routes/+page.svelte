<script lang="ts">
	import { CliparooState } from '$lib';
	import ClipboardTypeBadge from '$lib/components/clipboard-type-badge.svelte';
	import ClipboardWindowBadge from '$lib/components/clipboard-window-badge.svelte';
	import { formatDate } from '$lib/format';
	import { invoke } from '@tauri-apps/api/core';
	import { readText } from '@tauri-apps/plugin-clipboard-manager';

	const cs = new CliparooState();

	// fix:
	// [2024-11-09][23:47:40][tao::platform_impl::platform::event_loop::runner][WARN] NewEvents emitted without explicit RedrawEventsCleared
	// [2024-11-09][23:47:40][tao::platform_impl::platform::event_loop::runner][WARN] RedrawEventsCleared emitted without explicit MainEventsCleared
	$effect(() => {
		const id = setInterval(async () => {
			const [clipboardContent, currentWindowName] = await Promise.all([
				await readText(),
				await invoke<string>('get_window_name')
			]);

			cs.pushToClipboard({ text: clipboardContent, window: currentWindowName });
		}, 200);

		return () => {
			clearInterval(id);
		};
	});
</script>

<ul class="flex flex-col space-y-2">
	{#each cs.clipboard as entry}
		<li class="card bg-base-300 p-2">
			<ClipboardWindowBadge window={entry.window} />
			<p class="break-words">
				{entry.text}
			</p>
			<time class="text-sm">{formatDate(entry.timestamp)}</time>
			<ClipboardTypeBadge type={entry.type} />
		</li>
	{/each}
</ul>
