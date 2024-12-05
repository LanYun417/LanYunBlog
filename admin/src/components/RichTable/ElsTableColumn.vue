<template>
  <el-table-column
    :prop="prop"
    :label="label"
    :width="width"
    :sortable="sortable"
    align="center"
    header-align="center"
    show-overflow-tooltip
  >
    <template #default="scope">
      <!-- 文本 -->
      <span v-if="colType === 'text'">{{ scope.row[prop] }}</span>

      <!-- 图片 -->
      <el-image v-if="colType === 'image'" lazy :src="scope.row[prop]" />

      <!-- 多个标签 -->
      <template v-if="colType === 'tag' && isArray(scope.row[prop])">
        <el-tag class="mx-1" v-for="(tag, index) in scope.row[prop]" :key="index">
          {{ tag }}
        </el-tag>
      </template>

      <!-- 单个标签 -->
      <el-tag v-else-if="colType === 'tag'">
        {{ scope.row[prop] }}
      </el-tag>

      <!-- 超链接 -->
      <el-text v-if="colType === 'link'" type="primary">
        <a :href="scope.row[prop]" target="_blank">
          {{ scope.row[prop] }}
        </a>
      </el-text>
    </template>
  </el-table-column>
</template>

<script lang="ts">
import type { ColumnType } from './types';

export default defineComponent({
  name: 'ElsTableColumn',
  props: {
    // 列类型
    type: {
      type: String as PropType<ColumnType>,
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    width: {
      type: [String, Number]
    },
    sortable: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const colType = computed(() => {
      return props.type;
    });

    // 判断是否是一个数组
    const isArray = (arr: any) => {
      return Array.isArray(arr);
    };

    return {
      colType,
      isArray
    };
  }
});
</script>
