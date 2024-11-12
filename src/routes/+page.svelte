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
		<li class="card bg-base-300 p-2 h-36 flex flex-col justify-between">
			<ClipboardWindowBadge window={entry.window} />
			<!--- add ability to hide --->
			<p
				style="-webkit-line-clamp: 3; -webkit-box-orient: vertical; display: -webkit-box;"
				class="break-words text-ellipsis overflow-hidden"
			>
				{entry.text}
			</p>
			<div class="flex justify-between items-center">
				<ClipboardTypeBadge type={entry.type} />
				<!--- add ability to hide --->

				<time class="text-sm">{formatDate(entry.timestamp)}</time>
				<!--- add ability to hide --->
			</div>
		</li>
	{/each}
</ul>
