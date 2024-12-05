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
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

	const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
		const date = new Date(oneWeekAgo);
		date.setDate(oneWeekAgo.getDate() + i);
		return {
			name: date.toLocaleDateString(undefined, {
				weekday: 'short',
				month: 'short',
				day: 'numeric'
			}),
			day: date.getDay()
		};
	});

	let lastWeekEntries = $derived(
		cs.clipboard
			.filter((entry) => {
				const entryDate = new Date(entry.timestamp);
				return entryDate >= oneWeekAgo;
			})
			.toSorted((a, b) => a.text.localeCompare(b.text))
	);

	let types = $derived([...new Set(lastWeekEntries.map((entry) => entry.type))]);

	let dailyCountsByType = $derived(
		types.map((type) =>
			daysOfWeek.map(
				(day) =>
					lastWeekEntries.filter(
						(entry) => new Date(entry.timestamp).getDay() === day.day && entry.type === type
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
		labels: daysOfWeek.map((day) => day.name),
		datasets: dailyCountsByType.map((counts, index) => ({
			label: types[index],
			data: counts,
			backgroundColor: colorsArray[index],
			borderWidth: 2,
			borderColor: colorsArray[index]
		}))
	});

	interface EntriesOnLast_7DaysProps extends HTMLAttributes<HTMLElement> {}

	let { class: className, ...props }: EntriesOnLast_7DaysProps = $props();
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
