<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import cs from '$lib/cliparoo-state.svelte';
	import type { ClipboardEntry } from '$lib/types';

	interface DropdownMenuProps extends HTMLAttributes<HTMLElement> {
		entryId: ClipboardEntry['id'];
    buttonProps?: HTMLAttributes<HTMLButtonElement>;
	}
	let { class: className, entryId, buttonProps, ...props }: DropdownMenuProps = $props();
</script>

<div {...props} class={cn('dropdown dropdown-end', className)}>
	<button {...buttonProps} tabindex="0" class={cn("btn btn-sm size-8 p-0", buttonProps?.class)} aria-label="more options">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width=16
			height=16
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-ellipsis-vertical"
			><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle
				cx="12"
				cy="19"
				r="1"
			/></svg
		>
	</button>
	<ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
		<li>
			<button onclick={() => cs.deleteClipboardEntry(entryId)}>Delete</button>
		</li>
	</ul>
</div>
