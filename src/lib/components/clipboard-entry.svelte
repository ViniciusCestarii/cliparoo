<script lang="ts">
	import cs from '$lib/cliparoo-state.svelte';
	import { formatDate } from '$lib/format';
	import type { ClipboardEntry } from '$lib/types';
	import { fly } from 'svelte/transition';
	import ClipboardDropdownMenu from './clipboard-dropdown-menu.svelte';
	import ClipboardTypeBadge from './clipboard-type-badge.svelte';
	import ClipboardWindowBadge from './clipboard-window-badge.svelte';
	import { writeText } from '@tauri-apps/plugin-clipboard-manager';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	interface ClipboardEntryProps extends HTMLAttributes<HTMLElement> {
		entry: ClipboardEntry;
	}

	let { entry, class: className, ...props }: ClipboardEntryProps = $props();

	async function handleEntryClick(text: string) {
		await writeText(text);
		cs.ignoreNext(text);
		showCopiedIcon = true;
		setTimeout(() => {
			showCopiedIcon = false;
		}, 1500);
	}

	let showCopiedIcon = $state(false);
</script>

<div {...props} class={cn('relative', className)}>
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
	{#if showCopiedIcon}
		<div
			transition:fly={{ duration: 150, y: 5 }}
			class="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] border border-base-content rounded-btn p-1 bg-base-200"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-check-check"
				><path d="M18 6 7 17l-5-5" /><path d="m22 10-7.5 7.5L13 16" /></svg
			>
		</div>
	{/if}
</div>
