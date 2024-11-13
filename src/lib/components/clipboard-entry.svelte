<script lang="ts">
	import { formatDate } from '$lib/format';
	import type { ClipboardEntry } from '$lib/types';
	import ClipboardTypeBadge from './clipboard-type-badge.svelte';
	import ClipboardWindowBadge from './clipboard-window-badge.svelte';
	import { writeText } from '@tauri-apps/plugin-clipboard-manager';

	async function handleEntryClick(text: string) {
  await writeText(text);
  alert("Text copied! Use Ctrl+V (or Command+V) to paste it in the desired location.");
}

	let { entry }: { entry: ClipboardEntry } = $props();
</script>

<li>
	<button
		class="btn p-2 h-36 flex flex-col flex-nowrap items-start justify-between w-full text-start"
		onclick={() => handleEntryClick(entry.text)}
	>
		<ClipboardWindowBadge window={entry.window} />
		<!--- add ability to hide --->
		<p
			style="-webkit-line-clamp: 3; -webkit-box-orient: vertical; display: -webkit-box;"
			class="break-words text-ellipsis overflow-hidden text-sm pl-1"
		>
			{entry.text}
		</p>
		<div class="card-actions justify-between items-center">
			<ClipboardTypeBadge type={entry.type} />
			<!--- add ability to hide --->

			<time class="text-sm">{formatDate(entry.timestamp)}</time>
			<!--- add ability to hide --->
		</div>
	</button>
</li>
