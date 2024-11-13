<script lang="ts">
	import cs from '$lib/cliparoo-state.svelte';
	import { formatDate } from '$lib/format';
	import type { ClipboardEntry } from '$lib/types';
	import ClipboardDropdownMenu from './clipboard-dropdown-menu.svelte';
	import ClipboardTypeBadge from './clipboard-type-badge.svelte';
	import ClipboardWindowBadge from './clipboard-window-badge.svelte';
	import { writeText } from '@tauri-apps/plugin-clipboard-manager';

	async function handleEntryClick(text: string) {
		await writeText(text);
		// modify feedback
		alert('Text copied! Use Ctrl+V (or Command+V) to paste it in the desired location.');
	}

	let { entry }: { entry: ClipboardEntry } = $props();
</script>

<li class="relative">
	<button
		class="btn p-2 h-36 flex flex-col flex-nowrap items-start justify-between w-full text-start"
		onclick={() => handleEntryClick(entry.text)}
	>
		<ClipboardWindowBadge class="w-[calc(100%-2.25rem)]" window={entry.window} />
		<!--- add ability to hide --->
		<p
			style="-webkit-line-clamp: 3; -webkit-box-orient: vertical; display: -webkit-box;"
			class="break-all text-ellipsis overflow-hidden text-sm pl-1"
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
	<ClipboardDropdownMenu
		class="absolute top-[calc(0.5rem+2px)] right-2 p-0"
		buttonProps={{
			class: 'bg-transparent border-none hover:border focus:ring-2 ring-base-content'
		}}
		entryId={entry.id}
	/>
</li>
