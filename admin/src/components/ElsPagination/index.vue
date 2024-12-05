<template>
  <el-pagination
    v-model:current-page="current_Page"
    v-model:page-size="page_Size"
    :page-sizes="pageSizes"
    :background="true"
    :size="paginationSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts">
export default defineComponent({
  name: 'ElsPagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 每页显示条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 页码大小
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [20, 40, 60, 80, 100]
    }
  },
  emits: ['size-change', 'current-change'],
  setup(props, { emit }) {
    // 每页显示条数
    const page_Size = ref<number>(props.pageSize);
    watch(
      () => props.pageSize,
      (val: number) => {
        page_Size.value = val;
      }
    );
    // 当前页
    const current_Page = ref<number>(props.currentPage);
    watch(
      () => props.currentPage,
      (val: number) => {
        current_Page.value = val;
      }
    );

    // 页码大小变化
    const handleSizeChange = (val: number) => {
      emit('size-change', val);
    };
    // 当前页变化
    const handleCurrentChange = (val: number) => {
      emit('current-change', val);
    };

    // 分页器大小
    const paginationSize = ref<'small' | 'default'>('default');

    onMounted(() => {
      if (window.innerWidth <= 768) {
        paginationSize.value = 'small';
      }
      window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
          paginationSize.value = 'small';
        } else {
          paginationSize.value = 'default';
        }
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', () => {});
    });

    return {
      page_Size,
      current_Page,
      paginationSize,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>
