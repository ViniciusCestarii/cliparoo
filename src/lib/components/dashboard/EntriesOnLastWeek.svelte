<script lang="ts">
	import {
		BarElement,
		Chart,
		CategoryScale,
		LinearScale,
		Legend,
		Tooltip,
		type ChartData
	} from 'chart.js';
	import cs from '$lib/cliparoo-state.svelte';
	import { getColors } from '$lib/theme';
	import BarChart from '../charts/bar.svelte';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	Chart.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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

	interface EntriesOnLastWeekProps extends HTMLAttributes<HTMLElement> {}

	let { class:className, ...props }: EntriesOnLastWeekProps = $props();
</script>

<div {...props} class={cn('relative w-full aspect-video', className)}>
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
