<script lang="ts">
	import cs from '$lib/cliparoo-state.svelte';

	let showModal = $state(false);

	function resetData() {
		cs.reset();
		toggleModal();
	}

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<button class="btn btn-error btn-sm w-fit" onclick={toggleModal}>Reset Data</button>

{#if showModal}
	<div class="fixed inset-0 flex justify-center items-center bg-black/50 z-40">
		<div class="bg-base-100 p-6 rounded-md max-w-xl w-full">
			<div class="overflow-y-auto overflow-x-hidden max-h-[90vh]">
				<h2 class="text-xl font-semibold mb-4">Reset Data</h2>
				<p>Are you sure you want to reset all data?</p>
				<div class="flex justify-end mt-4 space-x-2">
					<button class="btn btn-ghost" onclick={toggleModal}>Cancel</button>
					<button class="btn btn-error" onclick={resetData}>Reset</button>
				</div>
			</div>
		</div>
	</div>
{/if}
