<template>
  <div class="photos-manage">
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
            <el-button link type="success" size="small" @click="handleDownload(scope.row)">
              下载
            </el-button>
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
        <el-form :model="viewForm" label-width="100">
          <el-form-item label="ID" prop="id">
            <div class="w-full truncate">{{ viewForm.id }}</div>
          </el-form-item>
          <el-form-item label="照片" prop="url">
            <div class="h-[100px]">
              <el-image class="h-full" :src="viewForm.url" />
            </div>
          </el-form-item>
          <el-form-item label="照片链接" prop="url">
            <div class="w-full truncate">{{ viewForm.url }}</div>
          </el-form-item>
          <el-form-item label="照片路径" prop="path">
            <div class="w-full truncate">{{ viewForm.path }}</div>
          </el-form-item>
          <el-form-item label="照片描述" prop="description">
            <div class="w-full truncate">{{ viewForm.description }}</div>
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
      <ElsDialog v-model="addDialogVisible" title="上传照片">
        <el-form ref="addFormInstance" :model="addForm" :rules="addFormRule" label-width="100">
          <el-form-item label="照片描述" prop="description">
            <el-input v-model="addForm.description" placeholder="请输入照片描述" />
          </el-form-item>
          <el-form-item label="上传照片" prop="url">
            <div class="h-[100px]">
              <el-image class="h-full" :src="addForm.url" />
            </div>
            <el-input class="mt-2" v-model="addForm.url" />
            <div class="mt-2">
              <SingleUpload :handleUpload="handleUpload" />
            </div>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="clearAndCloseAddForm">关闭</el-button>
        </template>
      </ElsDialog>

      <!-- 编辑 -->
      <ElsDialog v-model="editDialogVisible" title="编辑">
        <el-form ref="editFormInstance" :model="editForm" :rules="editFormRule" label-width="100">
          <el-form-item label="照片描述" prop="description">
            <el-input v-model="editForm.description" placeholder="请输入照片描述" />
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

<script name="PhotosManage" lang="ts" setup>
import {
  deletePhotoApi,
  downloadPhotoApi,
  fetchPhotoListApi,
  updatePhotoApi,
  uploadPhotoApi
} from '@/api/api.photo';
import { throttle } from 'lodash';
import { formatDate } from '@/utils/u.dayjs';
import type { Photo, PhotoList } from '@/types';
import type { FormInstance, FormRules } from 'element-plus';
import type { TableFields } from '@/components/RichTable/types';

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
const tableData = ref<PhotoList>([]);

// 表格字段
const fields: TableFields = [
  { type: 'text', label: 'ID', prop: 'id', sortable: true },
  { type: 'image', label: '照片', prop: 'url' },
  { type: 'link', label: '照片链接', prop: 'url' },
  { type: 'text', label: '照片路径', prop: 'path' },
  { type: 'text', label: '照片描述', prop: 'description' },
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
  const { data } = await fetchPhotoListApi(currentPage.value, pageSize.value, keyword.value);
  total.value = data.total;
  tableData.value = data.list.map((item: Photo) => {
    return {
      ...item,
      createdAt: formatDate(item.createdAt as string),
      updatedAt: formatDate(item.updatedAt as string)
    };
  });
};

// 选中项
const selectList = ref<PhotoList>([]);
const handleSelectionChange = (items: PhotoList): void => {
  selectList.value = items;
};

// 查看
const viewForm = ref<Photo>({
  id: 0,
  url: '',
  path: '',
  description: '',
  createdAt: '',
  updatedAt: ''
});
const viewDialogVisible = ref<boolean>(false);
const handleView = (row: Photo): void => {
  viewForm.value = { ...row };
  viewDialogVisible.value = true;
};

// 上传照片
const addFormInstance = ref<FormInstance>();
const addDialogVisible = ref<boolean>(false);
const addForm = reactive<Photo>({
  url: '',
  description: ''
});
const addFormRule = reactive<FormRules>({
  description: [{ required: true, message: '请输入照片描述', trigger: 'blur' }]
});
const handleUpload = (file: File) => {
  uploadPhotoApi(file, addForm.description).then(async ({ data }) => {
    if (data.code === 201) {
      addForm.url = data.files[0].url;
      ElMessage.success(data.message);
      await getTableData();
    }
  });
};
const clearAndCloseAddForm = (): void => {
  addFormInstance.value?.resetFields();
  addDialogVisible.value = false;
};

// 删除
const handleDelete = (row: Photo | PhotoList): void => {
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
      result = await deletePhotoApi(row.map((item) => item.id as number));
    } else {
      // 单个删除
      result = await deletePhotoApi(row.id as number);
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
const editForm = ref<Photo>({
  id: 0,
  description: ''
});
const editFormRule = reactive<FormRules>({
  description: [{ required: true, message: '请输入照片描述', trigger: 'blur' }]
});
const editDialogVisible = ref<boolean>(false);
const handleEdit = async (row: Photo): Promise<void> => {
  editForm.value = {
    id: row.id,
    description: row.description
  };
  editDialogVisible.value = true;
};
// 确认编辑
const handleConfirmEdit = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await updatePhotoApi({
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

// 下载照片
const handleDownload = (row: Photo) => {
  downloadPhotoApi(row.id as number).then(({ data }) => {
    const name: string[] = row.url?.split('/') as string[];
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name[name?.length - 1] + '';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  });
};

// 获取数据
onBeforeMount(async () => {
  await getTableData();
});
</script>
