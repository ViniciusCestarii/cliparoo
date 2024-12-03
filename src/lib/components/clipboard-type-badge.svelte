<script lang="ts">
	import type { ClipboardEntry } from '$lib/types';

	interface ClipboardTypeBadgeProps {
		type: ClipboardEntry['type'];
	}

	const badgeClass: Record<ClipboardEntry['type'], string> = {
		text: 'badge-primary',
		image: 'badge-secondary',
		url: 'badge-accent'
	};

	let { type }: ClipboardTypeBadgeProps = $props();

	const className = `badge ${badgeClass[type]}`;
</script>

<span class={className}>{type}</span>
