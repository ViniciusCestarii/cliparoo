<script lang="ts">
	import cs from '$lib/cliparoo-state.svelte';
	import { formatDate } from '$lib/format';
	import type { ClipboardEntry, Props } from '$lib/types';
	import { fly } from 'svelte/transition';
	import ClipboardDropdownMenu from './clipboard-dropdown-menu.svelte';
	import ClipboardTypeBadge from './clipboard-type-badge.svelte';
	import ClipboardWindowBadge from './clipboard-window-badge.svelte';
	import { writeText } from '@tauri-apps/plugin-clipboard-manager';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	interface ClipboardEntryProps extends HTMLAttributes<HTMLElement> {
		entry: ClipboardEntry;
		components?: {
			DropdownMenu?: Partial<Props<typeof ClipboardDropdownMenu>>;
			TypeBadge?: Partial<Props<typeof ClipboardTypeBadge>>;
			WindowBadge?: Partial<Props<typeof ClipboardWindowBadge>>;
		};
	}

	let { entry, class: className, components, ...props }: ClipboardEntryProps = $props();

	const sliceText = entry.text.length > 600 ? entry.text.slice(0, 600) + '[HIDDEN]' : entry.text;

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

<div {...props} class={cn('relative m-2', className)}>
	<button
		class="btn p-2 h-36 flex flex-col flex-nowrap items-start justify-between w-full text-start"
		onclick={() => handleEntryClick(entry.text)}
	>
		{#if cs.showWindowBadge}
			<ClipboardWindowBadge
				window={entry.window}
				{...components?.WindowBadge}
				class={cn('w-[calc(100%-2.25rem)]', components?.WindowBadge?.class)}
			/>
		{/if}
		<p
			style="-webkit-line-clamp: 3; -webkit-box-orient: vertical; display: -webkit-box;"
			class="break-all text-ellipsis overflow-hidden text-sm pl-1"
		>
			{sliceText}
		</p>
		<div class="card-actions justify-between items-center">
			{#if cs.showTypeBadge}
				<ClipboardTypeBadge type={entry.type} {...components?.TypeBadge} />
			{/if}

			{#if cs.showTimestamp}
				<time class="text-sm">{formatDate(entry.timestamp)}</time>
			{/if}
		</div>
	</button>
	<ClipboardDropdownMenu
		entryId={entry.id}
		{...components?.DropdownMenu}
		class={cn('absolute top-[calc(0.5rem+2px)] right-2 p-0', components?.DropdownMenu?.class)}
		buttonProps={{
			...components?.DropdownMenu?.buttonProps,
			class: cn(
				'bg-transparent border-none hover:border focus:ring-2 ring-base-content',
				components?.DropdownMenu?.buttonProps?.class
			)
		}}
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
