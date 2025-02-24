<template>
  <chart-container :option="option" />
</template>

<script lang="ts">
export default defineComponent({
  name: 'FunnelChart',
  props: {
    category: {
      type: Array as PropType<string[]>,
      default: () => ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
    },
    data: {
      type: Array as PropType<Array<{ name: string; value: number }>>,
      default: () => [
        { value: 60, name: 'Visit' },
        { value: 40, name: 'Inquiry' },
        { value: 20, name: 'Order' },
        { value: 80, name: 'Click' },
        { value: 100, name: 'Show' }
      ]
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'Funnel'
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        title: {
          text: props.title
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          },
          bottom: 0,
          right: 0
        },
        legend: {
          data: props.category
        },
        series: [
          {
            name: props.name,
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: props.data
          }
        ]
      };
    });

    return {
      option
    };
  }
});
</script>
