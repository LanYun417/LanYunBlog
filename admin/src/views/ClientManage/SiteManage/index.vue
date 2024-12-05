<template>
  <div class="site-manage">
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
        <el-form :model="viewForm" label-width="100">
          <el-form-item label="ID" prop="id">
            <div class="w-full truncate">{{ viewForm.id }}</div>
          </el-form-item>
          <el-form-item label="站点Logo" prop="logo">
            <div class="w-[100px] h-[100px]">
              <el-image :src="viewForm.logo" />
            </div>
          </el-form-item>
          <el-form-item label="站点标题" prop="title">
            <div class="w-full truncate">{{ viewForm.title }}</div>
          </el-form-item>
          <el-form-item label="站点域名" prop="domain">
            <div class="w-full truncate">
              <el-text type="primary">
                <a :href="viewForm.domain" target="_blank">{{ viewForm.domain }}</a>
              </el-text>
            </div>
          </el-form-item>
          <el-form-item label="站点关键词" prop="keywords">
            <div class="w-full truncate">{{ viewForm.keywords }}</div>
          </el-form-item>
          <el-form-item label="站点描述" prop="description">
            <div class="w-full truncate">{{ viewForm.description }}</div>
          </el-form-item>
          <el-form-item label="全局样式" prop="globalStyle">
            <el-input v-model="viewForm.globalStyle" :rows="3" type="textarea" disabled />
          </el-form-item>
          <el-form-item label="全局脚本" prop="globalScript">
            <el-input v-model="viewForm.globalScript" :rows="3" type="textarea" disabled />
          </el-form-item>
          <el-form-item label="是否启动" prop="isUse">
            <div class="w-full truncate">
              <el-tag>{{ viewForm.isUse === 'yes' ? '是' : '否' }}</el-tag>
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
          <el-form-item label="站点Logo" prop="logo">
            <div class="h-[100px]">
              <el-image class="h-full" :src="addForm.logo" />
            </div>
            <el-input class="mt-2" v-model="addForm.logo" />
            <div class="mt-2">
              <SingleUpload :handleUpload="handleUpload" />
            </div>
          </el-form-item>
          <el-form-item label="站点标题" prop="title">
            <el-input v-model="addForm.title" placeholder="请输入站点标题" />
          </el-form-item>
          <el-form-item label="站点域名" prop="domain">
            <el-input v-model="addForm.domain" placeholder="请输入站点域名" />
          </el-form-item>
          <el-form-item label="站点关键词" prop="keywords">
            <el-input v-model="addForm.keywords" type="textarea" placeholder="请输入站点关键词" />
          </el-form-item>
          <el-form-item label="站点描述" prop="description">
            <el-input v-model="addForm.description" type="textarea" placeholder="请输入站点描述" />
          </el-form-item>
          <el-form-item label="全局样式" prop="globalStyle">
            <el-input
              v-model="addForm.globalStyle"
              :rows="3"
              type="textarea"
              placeholder="请输入全局样式"
            />
          </el-form-item>
          <el-form-item label="全局脚本" prop="globalScript">
            <el-input
              v-model="addForm.globalScript"
              :rows="3"
              type="textarea"
              placeholder="请输入全局脚本"
            />
          </el-form-item>
          <el-form-item label="是否启用" prop="isUse">
            <el-switch
              v-model="addForm.isUse"
              active-value="yes"
              active-text="是"
              inactive-text="否"
              inactive-value="no"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAdd(addFormInstance)">确定</el-button>
        </template>
      </ElsDialog>

      <!-- 编辑 -->
      <ElsDialog v-model="editDialogVisible" title="编辑">
        <el-form ref="editFormInstance" :model="editForm" :rules="editFormRule" label-width="100">
          <el-form-item label="站点Logo" prop="logo">
            <div class="h-[100px]">
              <el-image class="h-full" :src="editForm.logo" />
            </div>
            <el-input class="mt-2" v-model="editForm.logo" />
            <div class="mt-2">
              <SingleUpload :handleUpload="handleUpload" />
            </div>
          </el-form-item>
          <el-form-item label="站点标题" prop="title">
            <el-input v-model="editForm.title" placeholder="请输入站点标题" />
          </el-form-item>
          <el-form-item label="站点域名" prop="domain">
            <el-input v-model="editForm.domain" placeholder="请输入站点域名" />
          </el-form-item>
          <el-form-item label="站点关键词" prop="keywords">
            <el-input v-model="editForm.keywords" type="textarea" placeholder="请输入站点关键词" />
          </el-form-item>
          <el-form-item label="站点描述" prop="description">
            <el-input v-model="editForm.description" type="textarea" placeholder="请输入站点描述" />
          </el-form-item>
          <el-form-item label="全局样式" prop="globalStyle">
            <el-input
              v-model="editForm.globalStyle"
              :rows="3"
              type="textarea"
              placeholder="请输入全局样式"
            />
          </el-form-item>
          <el-form-item label="全局脚本" prop="globalScript">
            <el-input
              v-model="editForm.globalScript"
              :rows="3"
              type="textarea"
              placeholder="请输入全局脚本"
            />
          </el-form-item>
          <el-form-item label="是否启用" prop="isUse">
            <el-switch
              v-model="editForm.isUse"
              active-value="yes"
              active-text="是"
              inactive-text="否"
              inactive-value="no"
            />
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

<script name="SiteManage" lang="ts" setup>
import {
  addSiteInfoApi,
  deleteSiteInfoApi,
  updateSiteInfoApi,
  fetchSiteInfoListApi
} from '@/api/api.site';
import { throttle } from 'lodash';
import { formatDate } from '@/utils/u.dayjs';
import { uploadFileApi } from '@/api/api.file';
import type { SiteInfo, SiteInfoList } from '@/types';
import type { TableFields } from '@/components/RichTable/types';
import { ElMessageBox, type FormInstance, type FormRules } from 'element-plus';

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
const tableData = ref<SiteInfoList>([]);

// 表格字段
const fields: TableFields = [
  { type: 'text', label: 'ID', prop: 'id', sortable: true },
  { type: 'image', label: '站点Logo', prop: 'logo' },
  { type: 'text', label: '站点标题', prop: 'title' },
  { type: 'link', label: '站点域名', prop: 'domain' },
  { type: 'text', label: '站点关键词', prop: 'keywords' },
  { type: 'text', label: '站点描述', prop: 'description' },
  { type: 'text', label: '全局样式', prop: 'globalStyle' },
  { type: 'text', label: '全局脚本', prop: 'globalScript' },
  { type: 'tag', label: '是否启用', prop: 'isUse' },
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
  const { data } = await fetchSiteInfoListApi(currentPage.value, pageSize.value, keyword.value);
  total.value = data.total;
  tableData.value = data.list.map((item: SiteInfo) => {
    return {
      ...item,
      createdAt: formatDate(item.createdAt as string),
      updatedAt: formatDate(item.updatedAt as string)
    };
  });
};

// 选中项
const selectList = ref<SiteInfoList>([]);
const handleSelectionChange = (items: SiteInfoList): void => {
  selectList.value = items;
};

// 查看
const viewForm = ref<SiteInfo>({
  id: 0,
  title: '',
  keywords: '',
  description: '',
  globalStyle: '',
  globalScript: '',
  domain: '',
  logo: '',
  isUse: 'no',
  createdAt: '',
  updatedAt: ''
});
const viewDialogVisible = ref<boolean>(false);
const handleView = (row: SiteInfo): void => {
  viewForm.value = { ...row };
  viewDialogVisible.value = true;
};

// 添加
const addDialogVisible = ref<boolean>(false);
const addFormInstance = ref<FormInstance>();
const addFormRule = reactive<FormRules>({
  title: [{ required: true, message: '请输入站点标题', trigger: 'blur' }],
  domain: [{ required: true, message: '请输入站点域名', trigger: 'blur' }],
  logo: [{ required: true, message: '请输入站点Logo链接', trigger: 'blur' }],
  isUse: [{ required: true, message: '是否启用', trigger: 'blur' }]
});
const addForm = ref<SiteInfo>({
  title: '',
  keywords: '',
  description: '',
  globalStyle: '',
  globalScript: '',
  domain: '',
  logo: '',
  isUse: 'no'
});
const handleAdd = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await addSiteInfoApi({
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
const handleDelete = (row: SiteInfo | SiteInfoList): void => {
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
      result = await deleteSiteInfoApi(row.map((item) => item.id as number));
    } else {
      // 单个删除
      result = await deleteSiteInfoApi(row.id as number);
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
const editForm = ref<SiteInfo>({
  id: 0,
  title: '',
  keywords: '',
  description: '',
  globalStyle: '',
  globalScript: '',
  domain: '',
  logo: '',
  isUse: 'no'
});
const editFormRule = reactive<FormRules>({
  title: [{ required: true, message: '请输入站点标题', trigger: 'blur' }],
  domain: [{ required: true, message: '请输入站点域名', trigger: 'blur' }],
  logo: [{ required: true, message: '请输入站点Logo链接', trigger: 'blur' }],
  isUse: [{ required: true, message: '是否启用', trigger: 'blur' }]
});
const editDialogVisible = ref<boolean>(false);
const handleEdit = async (row: SiteInfo): Promise<void> => {
  editForm.value = { ...row };
  editDialogVisible.value = true;
};
// 确认编辑
const handleConfirmEdit = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await updateSiteInfoApi({
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
  uploadFileApi(file).then((res) => {
    if (res.data.code === 200) {
      if (editDialogVisible.value) {
        editForm.value.logo = res.data.files[0].url;
      }
      if (addDialogVisible.value) {
        addForm.value.logo = res.data.files[0].url;
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
