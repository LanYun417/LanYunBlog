<template>
  <div class="access-record">
    <!-- 表格数据 -->
    <div class="w-full h-[90%]">
      <RichTable
        :data="tableData"
        :fields="fields"
        @on-delete="handleDelete"
        @on-search="t_handleSearch"
        @on-selection-change="handleSelectionChange"
      >
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleView(scope.row)">
              查看
            </el-button>
            <el-button link type="danger" size="small" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </RichTable>

      <!-- 查看 -->
      <ElsDialog v-model="viewDialogVisible" title="查看">
        <el-form :model="viewForm" label-width="100">
          <el-form-item label="ID" prop="id">
            <div class="w-full truncate">{{ viewForm.id }}</div>
          </el-form-item>
          <el-form-item label="访问方法" prop="method">
            <div class="w-full truncate">{{ viewForm.method }}</div>
          </el-form-item>
          <el-form-item label="访问地址" prop="url">
            <div class="w-full truncate">{{ viewForm.url }}</div>
          </el-form-item>
          <el-form-item label="用户IP" prop="ip">
            <div class="w-full truncate">{{ viewForm.ip }}</div>
          </el-form-item>
          <el-form-item label="国家" prop="country">
            <div class="w-full truncate">{{ viewForm.country }}</div>
          </el-form-item>
          <el-form-item label="省份" prop="province">
            <div class="w-full truncate">{{ viewForm.province }}</div>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <div class="w-full truncate">{{ viewForm.city }}</div>
          </el-form-item>
          <el-form-item label="网络运营商" prop="isp">
            <div class="w-full truncate">{{ viewForm.isp }}</div>
          </el-form-item>
          <el-form-item label="创建时间" prop="createdAt">
            <div class="w-full truncate">{{ viewForm.createdAt }}</div>
          </el-form-item>
          <el-form-item label="更新时间" prop="updatedAt">
            <div class="w-full truncate">{{ viewForm.updatedAt }}</div>
          </el-form-item>
        </el-form>
      </ElsDialog>
    </div>

    <!-- 分页 -->
    <div class="flex items-center justify-between py-2">
      <div class="mr-2 flex items-center">
        <el-text type="info" size="small">选中：{{ selectList.length }}项</el-text>
      </div>
      <el-scrollbar>
        <ElsPagination
          :total="total"
          :pageSize="pageSize"
          :currentPage="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script name="AccessRecord" lang="ts" setup>
import { throttle } from 'lodash';
import { formatDate } from '@/utils/u.dayjs';
import type { AccessInfo, AccessList } from '@/types';
import type { TableFields } from '@/components/RichTable/types';
import { deleteAccessRecordApi, fetchAccessRecordList } from '@/api/api.access';

// 分页
const total = ref<number>(0); // 总数
const pageSize = ref<number>(20); // 每页显示条数
const currentPage = ref<number>(1); // 当前页
const handleCurrentChange = (page: number): void => {
  currentPage.value = page;
  getTableData();
};
const handleSizeChange = (size: number): void => {
  pageSize.value = size;
  getTableData();
};

// 表格数据
const tableData = ref<AccessList>([]);

// 表格字段
const fields: TableFields = [
  { type: 'text', label: 'ID', prop: 'id', sortable: true },
  { type: 'tag', label: '访问方法', prop: 'method' },
  { type: 'text', label: '访问地址', prop: 'url' },
  { type: 'text', label: '用户IP', prop: 'ip' },
  { type: 'text', label: '国家', prop: 'country' },
  { type: 'text', label: '省份', prop: 'province' },
  { type: 'text', label: '城市', prop: 'city' },
  { type: 'text', label: '网络运营商', prop: 'isp' },
  { type: 'text', label: '创建时间', prop: 'createdAt' },
  { type: 'text', label: '更新时间', prop: 'updatedAt' }
];

// 搜索
const keyword = ref<string>('');
const handleSearch = async (k: string): Promise<void> => {
  keyword.value = k;
  currentPage.value = 1;
  await getTableData();
};
const t_handleSearch = throttle(handleSearch, 1000);

// 获取列表数据
const getTableData = async (): Promise<void> => {
  const { data } = await fetchAccessRecordList(currentPage.value, pageSize.value, keyword.value);
  total.value = data.total;
  tableData.value = data.list.map((item: AccessInfo) => {
    return {
      ...item,
      createdAt: formatDate(item.createdAt as string),
      updatedAt: formatDate(item.updatedAt as string)
    };
  });
};

// 选中项
const selectList = ref<AccessList>([]);
const handleSelectionChange = (items: AccessList): void => {
  selectList.value = items;
};

// 查看
const viewForm = ref<AccessInfo>({
  id: 0,
  method: '',
  url: '',
  ip: '',
  country: '',
  province: '',
  city: '',
  isp: '',
  createdAt: '',
  updatedAt: ''
});
const viewDialogVisible = ref<boolean>(false);
const handleView = (row: AccessInfo): void => {
  viewForm.value = { ...row };
  viewDialogVisible.value = true;
};

// 删除
const handleDelete = (row: AccessInfo | AccessList): void => {
  ElMessageBox.confirm('删除后无法恢复，是否确认删除？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    let result = null;
    if (row instanceof Array) {
      if (row.length < 1) {
        ElMessage.error('请选择要删除的项');
        return;
      }
      // 批量删除
      result = await deleteAccessRecordApi(row.map((item) => item.id as number));
    } else {
      // 单个删除
      result = await deleteAccessRecordApi(row.id as number);
    }

    if (result === null) {
      ElMessage.error('删除失败');
      return;
    }

    if (result.data.code === 200) {
      ElMessage.success(result.data.message);
      await getTableData();
    }
  });
};

// 获取数据
onBeforeMount(async () => {
  await getTableData();
});
</script>
