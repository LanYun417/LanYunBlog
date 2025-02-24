<template>
  <div class="chart-container w-full h-full" ref="chartContainer"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import ChinaMap from '@/components/Chart/assets/map/china.json';

// 注册地图
echarts.registerMap('China', ChinaMap as any);

export default defineComponent({
  name: 'ChartContainer',
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const option = computed(() => props.option);

    watch(option, (val: any) => {
      if (ecInstance) {
        ecInstance.setOption(val);
      }
    });

    const chartContainer = ref<HTMLElement>();

    let ecInstance: any = null;

    onMounted(() => {
      if (!option.value || option.value === void 0) {
        throw new Error('option is required!');
      }

      ecInstance = echarts.init(chartContainer.value);
      ecInstance.setOption(option.value);

      window.addEventListener('resize', () => {
        ecInstance && ecInstance.resize();
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', () => {
        ecInstance && ecInstance.resize();
      });
    });

    return {
      echarts,
      ecInstance,
      chartContainer
    };
  }
});
</script>
