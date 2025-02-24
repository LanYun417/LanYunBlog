<template>
  <chart-container :option="option" />
</template>

<script lang="ts">
export default defineComponent({
  name: 'RadarChart',
  props: {
    legend: {
      type: Array as PropType<string[]>,
      default: () => ['Allocated Budget', 'Actual Spending']
    },
    title: {
      type: String,
      default: ''
    },
    indicator: {
      type: Array as () => PropType<Array<{ name: string; max: number }>>,
      default: () => [
        { name: 'Sales' },
        { name: 'Administration' },
        { name: 'Information Technology' },
        { name: 'Customer Support' },
        { name: 'Development' },
        { name: 'Marketing' }
      ]
    },
    data: {
      type: Array as PropType<Array<{ name: string; value: number }>>,
      default: () => [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    },
    name: {
      type: String,
      default: 'Budget vs spending'
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        title: {
          text: props.title,
          left: 'center',
          top: '20px'
        },
        legend: { data: props.legend },
        radar: { indicator: props.indicator },
        series: [
          {
            name: props.name,
            type: 'radar',
            data: props.data
          }
        ],
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
