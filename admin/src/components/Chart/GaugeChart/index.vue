<template>
  <chart-container :option="option" />
</template>

<script lang="ts">
export default defineComponent({
  name: 'GaugeChart',
  props: {
    data: {
      type: Array as PropType<Array<{ name: string; value: number }>>,
      default: () => [{ value: 50, name: 'SCORE' }]
    },
    name: {
      type: String,
      default: 'Pressure'
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: props.name,
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: props.data
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
