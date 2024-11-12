<script lang="ts">
	import { formatDate } from '$lib/format';
	import type { ClipboardEntry } from '$lib/types';
	import ClipboardTypeBadge from './clipboard-type-badge.svelte';
	import ClipboardWindowBadge from './clipboard-window-badge.svelte';

	let { entry }: { entry: ClipboardEntry } = $props();
</script>

<li class="card bg-base-300 p-2 h-32 flex flex-col justify-between">
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
</li>
