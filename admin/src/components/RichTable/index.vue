<template>
  <div class="els-table w-full h-full">
    <!-- 表格工具栏 1 -->
    <div class="w-full flex justify-between items-center pb-2 border-b mb-2 dark:border-[#1e293b]">
      <div>
        <el-input v-model.lazy="keyword" type="text" size="small" placeholder="输入关键词搜索">
          <template #append>
            <el-button size="small" icon="Search" @click="handleSearch" />
          </template>
        </el-input>
        <slot name="filter-l"> </slot>
      </div>
      <div>
        <slot name="filter-r"> </slot>
      </div>
    </div>

    <!-- 表格工具栏 2 -->
    <div class="w-full flex justify-between items-center pb-2">
      <div>
        <el-popover placement="right-end" width="210px" trigger="click">
          <template #reference>
            <el-button size="small">
              <el-icon><Filter /></el-icon>
            </el-button>
          </template>
          <el-scrollbar class="rounded shadow-customOne p-2" height="300px">
            <div
              class="filter-item w-full h-9 flex items-center my-1 px-2"
              v-for="item in fieldsConfig"
              :key="item.prop"
            >
              <el-checkbox v-model="item.visibled">
                <span class="text-[#777]">{{ item.label }}</span>
              </el-checkbox>
            </div>
          </el-scrollbar>
        </el-popover>
        <slot name="tools-l"> </slot>
      </div>
      <div>
        <el-button icon="UploadFilled" size="small" @click="exportExcel">导出</el-button>
        <el-button icon="EditPen" size="small" type="primary" @click="handleAdd">添加</el-button>
        <el-button icon="Delete" size="small" type="danger" @click="handleDelete">删除</el-button>
        <slot name="tools-r"> </slot>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      fit
      border
      ref="table"
      :data="data"
      :height="height"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <!-- 多选 -->
      <el-table-column type="selection" width="45" />
      <!-- 表数据 -->
      <template v-for="col in fieldsConfig" :key="col.prop">
        <ElsTableColumn
          v-if="col.visibled"
          :type="col.type"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :sortable="col.sortable"
        />
      </template>
      <slot></slot>
    </el-table>
  </div>
</template>

<script lang="ts">
import type { TableFields } from './types';
import { exportTable } from '@/utils/u.table';
import ElsTableColumn from './ElsTableColumn.vue';

export default defineComponent({
  name: 'RichTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    fields: {
      type: Array as PropType<TableFields>,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '700'
    }
  },
  components: { ElsTableColumn },
  emits: ['onSearch', 'onSelectionChange', 'onDelete', 'onAdd'],
  setup(props, { emit }) {
    const isSelected = ref<any[]>([]); // 选中的行

    // 表格选择事件
    const handleSelectionChange = (val: any): void => {
      emit('onSelectionChange', val);
      isSelected.value = val;
    };

    // （批量）删除事件
    const handleDelete = (): void => {
      emit('onDelete', isSelected.value);
    };

    // 添加事件
    const handleAdd = (): void => {
      emit('onAdd');
    };

    // 搜索事件
    const keyword = ref<string>('');
    const handleSearch = (): void => {
      emit('onSearch', keyword.value);
    };
    watch(keyword, (): void => {
      handleSearch();
    });

    // 字段配置
    const fieldsConfig = ref<TableFields>([]);

    // 导出 Excel
    const table = ref(null);
    const exportExcel = (): void => {
      exportTable(table.value);
    };

    onBeforeMount(() => {
      fieldsConfig.value = props.fields.map((item) => {
        if (item.visibled === void 0) {
          item.visibled = true;
        }
        return item;
      });
    });

    return {
      table,
      keyword,
      fieldsConfig,
      handleAdd,
      exportExcel,
      handleDelete,
      handleSearch,
      handleSelectionChange
    };
  }
});
</script>
