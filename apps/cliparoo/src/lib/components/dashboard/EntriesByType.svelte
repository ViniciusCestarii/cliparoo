<script lang="ts">
	import { ArcElement, Chart, Legend, Tooltip, type ChartData } from 'chart.js';
	import cs from '$lib/cliparoo-state.svelte';
	import { getColors } from '$lib/theme';
	import Doughnut from '../charts/doughnut.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	Chart.register(Tooltip, Legend, ArcElement);

	let types = $derived(cs.clipboard.map((entry) => entry.type).toSorted());
	let uniqueTypes = $derived([...new Set(types)]);
	let typesSum = $derived(
		uniqueTypes.reduce<number[]>((acc, type) => {
			return [...acc, types.filter((t) => t === type).length];
		}, [])
	);

	let colors = $state(getColors());

	const updateColors = () => {
		colors = getColors();
	};

	let colorsArray = $derived([colors.primary, colors.accent]);

	const observer = new MutationObserver(updateColors);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

	let data: ChartData<'doughnut', number[], unknown> = $derived({
		labels: uniqueTypes,
		datasets: [
			{
				label: 'Clipboard Entries',
				data: typesSum,
				backgroundColor: colorsArray,
				borderWidth: 2,
				borderColor: colorsArray
			}
		]
	});

	interface EntriesByType extends HTMLAttributes<HTMLElement> {}

	let { class: className, ...props }: EntriesByType = $props();
</script>

<div {...props} class={cn('relative w-full aspect-square', className)}>
	<Doughnut {data} options={{ responsive: true }} />
</div>
