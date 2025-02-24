<template>
  <div class="admin-user">
    <!-- 表格数据 -->
    <div class="w-full h-[90%]">
      <RichTable
        :data="tableData"
        :fields="fields"
        @on-delete="handleDelete"
        @on-search="t_handleSearch"
        @on-add="addDialogVisible = true"
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
        <template #filter-r>
          <el-button type="primary" size="small" icon="Promotion" @click="goToPermissionManage">
            权限管理
          </el-button>
        </template>
      </RichTable>

      <!-- 查看 -->
      <ElsDialog v-model="viewDialogVisible" title="查看">
        <el-form :model="viewForm" label-width="100">
          <el-form-item label="ID" prop="id">
            <div class="w-full truncate">{{ viewForm.id }}</div>
          </el-form-item>
          <el-form-item label="用户头像" prop="avatar">
            <div class="w-[100px] h-[100px]">
              <el-image :src="viewForm.avatar" />
            </div>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <div class="w-full truncate">{{ viewForm.nickname }}</div>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <div class="w-full truncate">{{ viewForm.username }}</div>
          </el-form-item>
          <el-form-item label="用户权限" prop="permissionName">
            <div class="w-full truncate">
              <el-tag>{{ viewForm.permissionName }}</el-tag>
            </div>
          </el-form-item>
          <el-form-item label="创建时间" prop="createdAt">
            <div class="w-full truncate">{{ viewForm.createdAt }}</div>
          </el-form-item>
          <el-form-item label="更新时间" prop="updatedAt">
            <div class="w-full truncate">{{ viewForm.updatedAt }}</div>
          </el-form-item>
        </el-form>
      </ElsDialog>

      <!-- 添加 -->
      <ElsDialog v-model="addDialogVisible" title="添加">
        <el-form ref="addFormInstance" :model="addForm" :rules="addFormRule" label-width="100">
          <el-form-item label="用户头像" prop="avatar">
            <div class="h-[100px]">
              <el-image class="h-full" :src="addForm.avatar" />
            </div>
            <el-input class="mt-2" v-model="addForm.avatar" />
            <div class="mt-2">
              <SingleUpload :handleUpload="handleUpload" />
            </div>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="addForm.nickname" placeholder="请输入用户昵称" />
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input
              v-model="addForm.password"
              placeholder="请输入用户密码"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item label="用户权限" prop="permissionId">
            <el-select v-model="addForm.permissionId" placeholder="请选择父级分类">
              <el-option
                v-for="item in permissionList"
                :key="item.id"
                :label="`${item.name}（${item.description}）`"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAdd(addFormInstance)">确定</el-button>
        </template>
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

<script name="AdminUser" lang="ts" setup>
import { throttle } from 'lodash';
import { formatDate } from '@/utils/u.dayjs';
import { uploadFileApi } from '@/api/api.file';
import { useLayoutStore } from '@/layout/store';
import type { FormInstance, FormRules } from 'element-plus';
import type { TableFields } from '@/components/RichTable/types';
import { fetchAdminPermissionList } from '@/api/api.permission';
import type { AdminPermissionList, AdminUser, AdminUserList } from '@/types';
import { addAdminUserApi, deleteAdminUserApi, fetchAdminUserList } from '@/api/api.user';

const layoutStore = useLayoutStore();

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
const tableData = ref<AdminUserList>([]);

// 表格字段
const fields: TableFields = [
  { type: 'text', label: 'ID', prop: 'id', sortable: true },
  { type: 'image', label: '用户头像', prop: 'avatar' },
  { type: 'text', label: '用户昵称', prop: 'nickname' },
  { type: 'text', label: '用户名', prop: 'username' },
  { type: 'tag', label: '用户权限', prop: 'permissionName' },
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
  const { data } = await fetchAdminUserList(currentPage.value, pageSize.value, keyword.value);
  total.value = data.total;
  tableData.value = data.list.map((item: AdminUser) => {
    return {
      ...item,
      createdAt: formatDate(item.createdAt as string),
      updatedAt: formatDate(item.updatedAt as string)
    };
  });
};

// 选中项
const selectList = ref<AdminUserList>([]);
const handleSelectionChange = (items: AdminUserList): void => {
  selectList.value = items;
};

// 查看
const viewForm = ref<AdminUser>({
  id: 0,
  avatar: '',
  nickname: '',
  username: '',
  permissionName: '',
  createdAt: '',
  updatedAt: ''
});
const viewDialogVisible = ref<boolean>(false);
const handleView = (row: AdminUser): void => {
  viewForm.value = { ...row };
  viewDialogVisible.value = true;
};

// 添加
const addDialogVisible = ref<boolean>(false);
const addFormInstance = ref<FormInstance>();
const addFormRule = reactive<FormRules>({
  avatar: [{ required: true, message: '请输入头像URL', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  permissionId: [{ required: true, message: '请选择用户权限', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});
const addForm = ref<AdminUser>({
  avatar: '',
  nickname: '',
  username: '',
  permissionId: undefined,
  password: ''
});
const handleAdd = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await addAdminUserApi({
        ...addForm.value
      });
      if (data.code === 201) {
        ElMessage.success(data.message);
        await getTableData();
        addDialogVisible.value = false;
      } else {
        ElMessage.error('添加失败');
      }
    }
  });
};

// 删除
const handleDelete = (row: AdminUser | AdminUserList): void => {
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
      result = await deleteAdminUserApi(row.map((item) => item.id as number));
    } else {
      // 单个删除
      result = await deleteAdminUserApi(row.id as number);
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

// 获取权限列表
const permissionList = ref<AdminPermissionList>([]);
const getPermissionList = async (): Promise<void> => {
  const { data } = await fetchAdminPermissionList();
  permissionList.value = data.list;
};

// 上传文件
const handleUpload = (file: File) => {
  uploadFileApi(file).then((res) => {
    if (res.data.code === 200) {
      addForm.value.avatar = res.data.files[0].url;
    } else {
      ElMessage.error('上传失败');
    }
  });
};

// 前往权限管理页面
const goToPermissionManage = (): void => {
  layoutStore.goTo({
    path: '/permissionManage',
    name: 'PermissionManage',
    meta: {
      title: '权限管理'
    }
  });
};

// 获取数据
onBeforeMount(async () => {
  await getPermissionList();
  await getTableData();
});
</script>
