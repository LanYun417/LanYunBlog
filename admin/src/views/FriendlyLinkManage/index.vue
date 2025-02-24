<template>
  <div class="friendly-link-manage">
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
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button link type="danger" size="small" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </RichTable>

      <!-- 查看 -->
      <ElsDialog v-model="viewDialogVisible" title="查看">
        <el-form :model="viewForm" label-width="120">
          <el-form-item label="ID" prop="id">
            <div class="w-full truncate">{{ viewForm.id }}</div>
          </el-form-item>
          <el-form-item label="友链图标" prop="icon">
            <div class="w-[100px] h-[100px]">
              <el-image :src="viewForm.icon" />
            </div>
          </el-form-item>
          <el-form-item label="友链名称" prop="name">
            <div class="w-full truncate">{{ viewForm.name }}</div>
          </el-form-item>
          <el-form-item label="友链链接" prop="url">
            <div class="w-full truncate">{{ viewForm.url }}</div>
          </el-form-item>
          <el-form-item label="站长邮箱" prop="email">
            <div class="w-full truncate">{{ viewForm.email }}</div>
          </el-form-item>
          <el-form-item label="审核状态" prop="status">
            <div class="w-full truncate">
              <el-tag>{{ viewForm.status }}</el-tag>
            </div>
          </el-form-item>
          <el-form-item label="友链描述" prop="description">
            <div class="w-full truncate">{{ viewForm.description }}</div>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <div class="w-full truncate">{{ viewForm.remark }}</div>
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
        <el-form ref="addFormInstance" :model="addForm" :rules="addFormRule" label-width="120">
          <el-form-item label="友链站点图标" prop="icon">
            <div class="h-[100px]">
              <el-image class="h-full" :src="addForm.icon" />
            </div>
            <el-input class="mt-2" v-model="addForm.icon" />
            <div class="mt-2">
              <SingleUpload :handleUpload="handleUpload" />
            </div>
          </el-form-item>
          <el-form-item label="友链站点名称" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入友链站点名称" />
          </el-form-item>
          <el-form-item label="友链站点链接" prop="url">
            <el-input v-model="addForm.url" placeholder="请输入友链站点链接" />
          </el-form-item>
          <el-form-item label="友链站长邮箱" prop="email">
            <el-input v-model="addForm.email" placeholder="请输入友链站长邮箱" />
          </el-form-item>
          <el-form-item label="友链站点描述" prop="description">
            <el-input v-model="addForm.description" placeholder="请输入友链站点描述" />
          </el-form-item>
          <el-form-item label="友链审核状态" prop="status">
            <el-select v-model="addForm.status" placeholder="请选择友链审核状态">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addForm.remark" placeholder="备注" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAdd(addFormInstance)">确定</el-button>
        </template>
      </ElsDialog>

      <!-- 编辑 -->
      <ElsDialog v-model="editDialogVisible" title="编辑">
        <el-form ref="editFormInstance" :model="editForm" :rules="editFormRule" label-width="120">
          <el-form-item label="友链站点图标" prop="icon">
            <div class="h-[100px]">
              <el-image class="h-full" :src="editForm.icon" />
            </div>
            <el-input class="mt-2" v-model="editForm.icon" />
            <div class="mt-2">
              <SingleUpload :handleUpload="handleUpload" />
            </div>
          </el-form-item>
          <el-form-item label="友链站点名称" prop="name">
            <el-input v-model="editForm.name" placeholder="请输入友链站点名称" />
          </el-form-item>
          <el-form-item label="友链站点链接" prop="url">
            <el-input v-model="editForm.url" placeholder="请输入友链站点链接" />
          </el-form-item>
          <el-form-item label="友链站长邮箱" prop="email">
            <el-input v-model="editForm.email" placeholder="请输入友链站长邮箱" />
          </el-form-item>
          <el-form-item label="友链站点描述" prop="description">
            <el-input v-model="editForm.description" placeholder="请输入友链站点描述" />
          </el-form-item>
          <el-form-item label="友链状态" prop="status">
            <el-select v-model="editForm.status" placeholder="请选择友链审核状态">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="editForm.remark" placeholder="备注" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmEdit(editFormInstance)">确定</el-button>
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

<script name="FriendlyLinkManage" lang="ts" setup>
import {
  addFriendlyLinkApi,
  updateFriendlyLinkApi,
  deleteFriendlyLinkApi,
  fetchFriendlyLinkListApi
} from '@/api/api.friendlyLink';
import { throttle } from 'lodash';
import { formatDate } from '@/utils/u.dayjs';
import { uploadFileApi } from '@/api/api.file';
import type { FormInstance, FormRules } from 'element-plus';
import type { TableFields } from '@/components/RichTable/types';
import type { ArticleTag, ArticleTagList, FriendlyLink, FriendlyLinkList } from '@/types';

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

const statusList = [
  { value: 'pending', label: 'pending（待审核）' },
  { value: 'approved', label: 'approved（已通过）' },
  { value: 'rejected', label: 'rejected（已拒绝）' }
];

// 表格数据
const tableData = ref<ArticleTagList>([]);

// 表格字段
const fields: TableFields = [
  { type: 'text', label: 'ID', prop: 'id', sortable: true },
  { type: 'image', label: '友链图标', prop: 'icon' },
  { type: 'text', label: '友链名称', prop: 'name' },
  { type: 'link', label: '友链链接', prop: 'url' },
  { type: 'text', label: '站长邮箱', prop: 'email' },
  { type: 'text', label: '友链描述', prop: 'description' },
  { type: 'tag', label: '友链状态', prop: 'status' },
  { type: 'text', label: '备注', prop: 'remark' },
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
  const { data } = await fetchFriendlyLinkListApi(currentPage.value, pageSize.value, keyword.value);
  total.value = data.total;
  tableData.value = data.list.map((item: ArticleTag) => {
    return {
      ...item,
      createdAt: formatDate(item.createdAt as string),
      updatedAt: formatDate(item.updatedAt as string)
    };
  });
};

// 选中项
const selectList = ref<ArticleTagList>([]);
const handleSelectionChange = (items: ArticleTagList): void => {
  selectList.value = items;
};

// 查看
const viewForm = ref<FriendlyLink>({
  id: 0,
  name: '',
  url: '',
  icon: '',
  status: 'pending',
  email: '',
  remark: '',
  description: '',
  createdAt: '',
  updatedAt: ''
});
const viewDialogVisible = ref<boolean>(false);
const handleView = (row: FriendlyLink): void => {
  viewForm.value = { ...row };
  viewDialogVisible.value = true;
};

// 添加
const addDialogVisible = ref<boolean>(false);
const addFormInstance = ref<FormInstance>();
const addFormRule = reactive<FormRules>({
  name: [{ required: true, message: '请输入友链站点名称', trigger: 'blur' }],
  url: [{ required: true, message: '请输入友链站点链接', trigger: 'blur' }],
  icon: [{ required: true, message: '请输入友链站点图标链接', trigger: 'blur' }],
  status: [{ required: true, message: '请选择友链状态', trigger: 'blur' }],
  description: [{ required: true, message: '请输入友链描述', trigger: 'blur' }],
  email: [{ required: true, message: '请输入站长邮箱', trigger: 'blur' }]
});
const addForm = ref<FriendlyLink>({
  name: '',
  url: '',
  icon: '',
  remark: '',
  email: '',
  status: 'pending',
  description: ''
});
const handleAdd = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await addFriendlyLinkApi({
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
const handleDelete = (row: FriendlyLink | FriendlyLinkList): void => {
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
      result = await deleteFriendlyLinkApi(row.map((item) => item.id as number));
    } else {
      // 单个删除
      result = await deleteFriendlyLinkApi(row.id as number);
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

// 编辑
const editFormInstance = ref<FormInstance>();
const editForm = ref<FriendlyLink>({
  id: 0,
  name: '',
  url: '',
  icon: '',
  remark: '',
  email: '',
  status: 'pending',
  description: ''
});
const editFormRule = reactive<FormRules>({
  name: [{ required: true, message: '请输入友链站点名称', trigger: 'blur' }],
  url: [{ required: true, message: '请输入友链站点链接', trigger: 'blur' }],
  icon: [{ required: true, message: '请输入友链站点图标链接', trigger: 'blur' }],
  status: [{ required: true, message: '请选择友链状态', trigger: 'blur' }],
  description: [{ required: true, message: '请输入友链描述', trigger: 'blur' }],
  email: [{ required: true, message: '请输入站长邮箱', trigger: 'blur' }]
});
const editDialogVisible = ref<boolean>(false);
const handleEdit = async (row: FriendlyLink): Promise<void> => {
  editForm.value = { ...row };
  editDialogVisible.value = true;
};
// 确认编辑
const handleConfirmEdit = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await updateFriendlyLinkApi({
        ...editForm.value,
        createdAt: undefined,
        updatedAt: undefined
      });
      if (data.code === 200) {
        ElMessage.success(data.message);
        await getTableData();
        editDialogVisible.value = false;
      } else {
        ElMessage.error('编辑失败');
      }
    }
  });
};

// 上传文件
const handleUpload = (file: File) => {
  uploadFileApi(file).then(({ data }) => {
    if (data.code === 200) {
      if (editDialogVisible.value) {
        editForm.value.icon = data.files[0].url;
      }
      if (addDialogVisible.value) {
        addForm.value.icon = data.files[0].url;
      }
    } else {
      ElMessage.error('上传失败');
    }
  });
};

// 获取数据
onBeforeMount(async () => {
  await getTableData();
});
</script>
