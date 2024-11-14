<script lang="ts">
	import type { DefaultDataPoint } from 'chart.js';
	import { Chart as ChartJS, DoughnutController } from 'chart.js';
	import Chart from './chart.svelte';
	import type { ChartBaseProps } from './types/chart';

	interface DoughnutProps<TData = DefaultDataPoint<'doughnut'>, TLabel = unknown>
		extends Omit<ChartBaseProps<'doughnut', TData, TLabel>, 'type'> {
		chart?: ChartJS<'doughnut', TData, TLabel> | null;
	}

	ChartJS.register(DoughnutController);
	let { chart, ...props }: DoughnutProps = $props();
</script>

<Chart {chart} type="doughnut" {...props as any} />
