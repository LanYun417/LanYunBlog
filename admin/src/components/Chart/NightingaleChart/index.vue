<template>
  <chart-container :option="option" />
</template>

<script lang="ts">
export default defineComponent({
  name: 'NightingaleChart',
  props: {
    data: {
      type: Array as PropType<Array<{ name: string; value: number }>>,
      default: () => [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
      ]
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'Nightingale Chart'
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        title: { text: props.title, left: 'center', top: '20px' },
        legend: {
          top: 'top'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          right: 0,
          bottom: 0
        },
        series: [
          {
            name: props.name,
            type: 'pie',
            radius: ['15%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.data
          }
        ],
        tooltip: { trigger: 'item' }
      };
    });

    return {
      option
    };
  }
});
</script>
