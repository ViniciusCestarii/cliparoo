<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { ChartType, DefaultDataPoint } from 'chart.js';
  import { Chart as ChartJS } from 'chart.js';
	import type { ChartBaseProps } from './types/chart.js';

  interface ChartProps<
    TType extends ChartType = ChartType,
    TData = DefaultDataPoint<TType>,
    TLabel = unknown
  > extends ChartBaseProps<TType, TData, TLabel> {
    chart?: ChartJS<TType, TData, TLabel> | null;
  }

  let {type, data, options, plugins, updateMode, ...props}:ChartProps  = $props()

  let canvasRef = $state<HTMLCanvasElement>();
  let chart = $state<ChartJS | null>(null); 


  onMount(() => {
    chart = new ChartJS(canvasRef!, {
      type,
      data,
      options,
      plugins,
    });
  });

  $effect(() => {
    if (!chart) return;

    chart.data = data;
    Object.assign(chart.options, options);
    chart.update(updateMode);
  });

  onDestroy(() => {
    if (chart) chart.destroy();
    chart = null;
  });
</script>

<canvas bind:this={canvasRef} {...props} ></canvas>