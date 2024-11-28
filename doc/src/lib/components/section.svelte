<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	var { class: className, children, ...props }: HTMLAttributes<HTMLElement> = $props();
</script>

<section class={cn('mx-auto min-h-screen max-w-screen-lg scroll-mt-20', className)} {...props}>
	{@render children?.()}
</section>
