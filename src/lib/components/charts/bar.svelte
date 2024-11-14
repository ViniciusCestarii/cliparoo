<script lang="ts">
  import type { DefaultDataPoint } from 'chart.js';
  import { Chart as ChartJS, BarController } from 'chart.js';
  import Chart from './chart.svelte';
	import type { ChartBaseProps } from './types/chart';

  interface BarProps<TData = DefaultDataPoint<'bar'>, TLabel = unknown>
    extends Omit<ChartBaseProps<'bar', TData, TLabel>, 'type'> {
    chart?: ChartJS<'bar', TData, TLabel> | null;
  }

  ChartJS.register(BarController);
  let { chart, ...props }: BarProps = $props();
</script>

<Chart chart={chart} type="bar" {...props} />