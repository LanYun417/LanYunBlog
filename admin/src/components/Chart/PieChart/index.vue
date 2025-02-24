<template>
  <chart-container :option="option" />
</template>

<script lang="ts">
export default defineComponent({
  name: 'PieChart',
  props: {
    data: {
      type: Array as PropType<Array<{ name: string; value: number }>>,
      default: () => [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'Access From'
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        title: { text: props.title, left: 'center', top: '20px' },
        tooltip: { trigger: 'item' },
        legend: { left: 'center', bottom: 0 },
        series: [
          {
            name: props.name,
            type: 'pie',
            radius: '50%',
            data: props.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
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
