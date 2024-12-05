<template>
  <div class="leave-message">
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
          <el-form-item label="邮箱" prop="email">
            <div class="w-full truncate">{{ viewForm.email }}</div>
          </el-form-item>
          <el-form-item label="留言内容" prop="message">
            <div class="w-full truncate">{{ viewForm.message }}</div>
          </el-form-item>
          <el-form-item label="IP" prop="ip">
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

<script name="TagManage" lang="ts" setup>
import { throttle } from 'lodash';
import { formatDate } from '@/utils/u.dayjs';
import type { LeaveMessage, LeaveMessageList } from '@/types';
import type { TableFields } from '@/components/RichTable/types';
import { deleteLeaveMessageApi, fetchLeaveMessageApi } from '@/api/api.leaveMessage';

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
const tableData = ref<LeaveMessageList>([]);

// 表格字段
const fields: TableFields = [
  { type: 'text', label: 'ID', prop: 'id', sortable: true },
  { type: 'text', label: '邮箱', prop: 'email' },
  { type: 'text', label: '留言内容', prop: 'message' },
  { type: 'text', label: 'IP', prop: 'ip' },
  { type: 'text', label: '国家', prop: 'country' },
  { type: 'text', label: '省份', prop: 'province' },
  { type: 'text', label: '城市', prop: 'city' },
  { type: 'text', label: '运营商', prop: 'isp' },
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
  const { data } = await fetchLeaveMessageApi(currentPage.value, pageSize.value, keyword.value);
  total.value = data.total;
  tableData.value = data.list.map((item: LeaveMessage) => {
    return {
      ...item,
      createdAt: formatDate(item.createdAt as string),
      updatedAt: formatDate(item.updatedAt as string)
    };
  });
};

// 选中项
const selectList = ref<LeaveMessageList>([]);
const handleSelectionChange = (items: LeaveMessageList): void => {
  selectList.value = items;
};

// 查看
const viewForm = ref<LeaveMessage>({
  id: 0,
  email: '',
  message: '',
  ip: '',
  country: '',
  province: '',
  city: '',
  isp: '',
  createdAt: '',
  updatedAt: ''
});
const viewDialogVisible = ref<boolean>(false);
const handleView = (row: LeaveMessage): void => {
  viewForm.value = { ...row };
  viewDialogVisible.value = true;
};

// 删除
const handleDelete = (row: LeaveMessage | LeaveMessageList): void => {
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
      result = await deleteLeaveMessageApi(row.map((item) => item.id as number));
    } else {
      // 单个删除
      result = await deleteLeaveMessageApi(row.id as number);
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
