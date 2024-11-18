<script lang="ts">
	import {
		ArcElement,
		BarElement,
		CategoryScale,
		Chart,
		Legend,
		LinearScale,
		Title,
		Tooltip,
		type ChartData
	} from 'chart.js';
	import Doughnut from './charts/doughnut.svelte';
	import cs from '$lib/cliparoo-state.svelte';
	import { getColors } from '$lib/theme';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

	let types = $derived(cs.clipboard.map((entry) => entry.type));
	let uniqueTypes = $derived([...new Set(types)]);

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
				data: uniqueTypes.reduce<number[]>((acc, type) => {
					return [...acc, types.filter((t) => t === type).length];
				}, []),
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

<Doughnut {data} options={{ responsive: true }} />
