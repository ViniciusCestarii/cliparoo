<script lang="ts">
	import { ArcElement, Chart, Legend, Tooltip, type ChartData } from 'chart.js';
	import cs from '$lib/cliparoo-state.svelte';
	import { getColors } from '$lib/theme';
	import Doughnut from '../charts/doughnut.svelte';

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

	const observer = new MutationObserver(updateColors);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

	let data: ChartData<'doughnut', number[], unknown> = $derived({
		labels: uniqueTypes,
		datasets: [
			{
				label: 'Clipboard Entries',
				data: typesSum,
				backgroundColor: [
					colors.primary,
					colors.accent,
					'rgba(255, 218, 128,0.4)',
					'rgba(113, 205, 205,0.4)',
					'rgba(170, 128, 252,0.4)',
					'rgba(255, 177, 101,0.4)'
				],
				borderWidth: 2,
				borderColor: [
					colors.primary,
					colors.accent,
					'rgba(255, 218, 128, 1)',
					'rgba(113, 205, 205, 1)',
					'rgba(170, 128, 252, 1)',
					'rgba(255, 177, 101, 1)'
				]
			}
		]
	});
</script>

<div class="relative w-full aspect-square">
	<Doughnut {data} options={{ responsive: true }} />
</div>
