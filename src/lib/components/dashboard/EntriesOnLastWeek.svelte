<script lang="ts">
	import { BarElement, Chart, Legend, Tooltip, type ChartData } from 'chart.js';
	import cs from '$lib/cliparoo-state.svelte';
	import { getColors } from '$lib/theme';
	import BarChart from '../charts/bar.svelte';

	Chart.register(Tooltip, Legend, BarElement);

	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Get the date one week ago

	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	let lastWeekEntries = $derived(
		cs.clipboard.filter((entry) => {
			const entryDate = new Date(entry.timestamp);
			return entryDate >= oneWeekAgo;
		})
	);

	let types = $derived([...new Set(lastWeekEntries.map((entry) => entry.type))]);

	let dailyCountsByType = $derived(
		types.map((type) =>
			daysOfWeek.map(
				(_, i) =>
					lastWeekEntries.filter(
						(entry) => new Date(entry.timestamp).getDay() === i && entry.type === type
					).length
			)
		)
	);

	let colors = $state(getColors());
	const updateColors = () => {
		colors = getColors();
	};

	let colorsArray = $derived([colors.primary, colors.accent]);

	const observer = new MutationObserver(updateColors);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

	let data: ChartData<'bar', number[], unknown> = $derived({
		labels: daysOfWeek,
		datasets: dailyCountsByType.map((counts, index) => ({
			label: types[index],
			data: counts,
			backgroundColor: colorsArray[index],
			borderWidth: 2,
			borderColor: colorsArray[index]
		}))
	});
</script>

<div class="relative w-full col-span-2">
	<BarChart
		{data}
		options={{
			responsive: true,
			scales: {
				x: { stacked: true },
				y: { stacked: true }
			}
		}}
	/>
</div>
