<script lang="ts">
	import { CliparooState } from '$lib';
	import CurrentClipboard from '$lib/components/current-clipboard.svelte';
	import CurrentWindow from '$lib/components/current-window.svelte';
	import { invoke } from '@tauri-apps/api/core';
	import { readText } from '@tauri-apps/plugin-clipboard-manager';
	import { info } from '@tauri-apps/plugin-log';

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

			info(`${clipboardContent} ${currentWindowName}`);

			cs.pushToClipboard({ text: clipboardContent, window: currentWindowName });
		}, 200);

		return () => {
			clearInterval(id);
		};
	});

	$inspect(cs.clipboard, cs.theme);
</script>

<div class="bg-base-200 min-h-screen">
	<h1>Cliparoo</h1>
	<CurrentClipboard />
	<CurrentWindow />
	<ul>
		{#each cs.clipboard as item}
			<li>
				{item.text}
				{item.window}
				{item.timestamp}
			</li>
		{/each}
	</ul>
</div>
