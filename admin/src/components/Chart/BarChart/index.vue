<template>
  <chart-container :option="option" />
</template>

<script lang="ts">
export default defineComponent({
  name: 'BarChart',
  props: {
    category: {
      type: Array as PropType<string[]>,
      default: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    data: {
      type: Array as PropType<number[]>,
      default: () => [150, 230, 224, 218, 135, 147, 260]
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        title: { text: props.title, left: 'center', top: '20px' },
        xAxis: { type: 'category', data: props.category },
        yAxis: { type: 'value' },
        series: [{ data: props.data, type: 'bar' }],
        tooltip: { trigger: 'item' },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          },
          bottom: 0,
          right: 0
        }
      };
    });

    return {
      option
    };
  }
});
</script>
