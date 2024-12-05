<script lang="ts">
	import { cn } from '$lib/utils';
	import type { SvelteHTMLElements } from 'svelte/elements';

	let showModal = $state(false);

	function toggleModal(e: MouseEvent) {
		showModal = !showModal;
		e.stopPropagation();
	}

	let { class: className, ...props }: SvelteHTMLElements['button'] = $props();
</script>

<button
	onclick={toggleModal}
	class={cn('btn btn-ghost btn-circle', className)}
	title="Filter & Search Help"
	aria-label="filter and search help"
	{...props}
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
		class="lucide lucide-circle-help"
	>
		<circle cx="12" cy="12" r="10" />
		<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
		<path d="M12 17h.01" />
	</svg>
</button>

{#if showModal}
	<div class="fixed inset-0 flex justify-center items-center bg-black/50 z-40">
		<div class="bg-base-100 p-6 rounded-md max-w-lg w-full">
			<div class="overflow-y-auto overflow-x-hidden max-h-[90vh]">
				<h2 class="text-xl font-semibold mb-4">Search & Filter Explanation</h2>
				<p>You can filter clipboard entries using the following format:</p>
				<ul class="list-disc ml-5 mb-4">
					<li><strong>type:</strong> Filters by the type of entry (e.g., <code>type:url</code>)</li>
					<li>
						<strong>window:</strong> Filters by the window name (e.g.,
						<code>window:"Cliparoo App"</code>) - Enclose in quotes if it has spaces
					</li>
					<li>
						<strong>text:</strong> Filters by the text content (e.g.,
						<code>text:"Ola Brasil"</code>)
					</li>
				</ul>
				<p class="mb-4">
					If you want to search without specific filters, just enter the search term directly, and
					it will search across all fields (type, window, and text). Example: <code>john doe</code>.
				</p>
				<p>
					To disable filtering, you can start the search with <strong>NOFILTER</strong>, e.g.,
					<code>NOFILTER john doe</code>.
				</p>
				<div class="mt-4 flex justify-end">
					<button onclick={toggleModal} class="btn btn-primary">Close</button>
				</div>
			</div>
		</div>
	</div>
{/if}
