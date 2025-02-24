<template>
  <div class="sec-category">
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
          <el-form-item label="分类名称" prop="name">
            <div class="w-full truncate">{{ viewForm.name }}</div>
          </el-form-item>
          <el-form-item label="分类描述" prop="description">
            <div class="w-full truncate">{{ viewForm.description }}</div>
          </el-form-item>
          <el-form-item label="文章数量" prop="articleCount">
            <div class="w-full truncate">{{ viewForm.articleCount }}</div>
          </el-form-item>
          <el-form-item label="父级分类" prop="parentName">
            <div class="w-full truncate">{{ viewForm.parentName }}</div>
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
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入分类名称" />
          </el-form-item>
          <el-form-item label="分类描述" prop="description">
            <el-input v-model="addForm.description" placeholder="请输入分类描述" />
          </el-form-item>
          <el-form-item label="父级分类" prop="parentId">
            <el-select v-model="addForm.parentId" placeholder="请选择父级分类">
              <el-option
                v-for="item in mainCategory"
                :key="item.id"
                :label="item.name"
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

      <!-- 编辑 -->
      <ElsDialog v-model="editDialogVisible" title="编辑">
        <el-form ref="editFormInstance" :model="editForm" :rules="editFormRule" label-width="100">
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="editForm.name" placeholder="请输入分类名称" />
          </el-form-item>
          <el-form-item label="分类描述" prop="description">
            <el-input v-model="editForm.description" placeholder="请输入分类描述" />
          </el-form-item>
          <el-form-item label="父级分类" prop="parentId">
            <el-select v-model="editForm.parentId" placeholder="请选择父级分类">
              <el-option
                v-for="item in mainCategory"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
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

<script name="SecCategory" lang="ts" setup>
import type {
  ArticleCategory,
  ArticleCategoryList,
  ArticleSecCategory,
  ArticleSecCategoryList
} from '@/types';
import {
  addArticleSecCategoryApi,
  deleteArticleSecCategoryApi,
  fetchArticleCategoryList,
  fetchArticleSecCategoryList,
  updateArticleSecCategoryApi
} from '@/api/api.category';
import { throttle } from 'lodash';
import { formatDate } from '@/utils/u.dayjs';
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
const tableData = ref<ArticleSecCategoryList>([]);

// 表格字段
const fields: TableFields = [
  { type: 'text', label: 'ID', prop: 'id', sortable: true },
  { type: 'text', label: '标签名称', prop: 'name' },
  { type: 'text', label: '标签描述', prop: 'description' },
  { type: 'text', label: '文章数量', prop: 'articleCount' },
  { type: 'text', label: '父级分类名称', prop: 'parentName' },
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
  const { data } = await fetchArticleSecCategoryList(
    currentPage.value,
    pageSize.value,
    keyword.value
  );
  total.value = data.total;
  tableData.value = data.list.map((item: ArticleSecCategory) => {
    return {
      ...item,
      createdAt: formatDate(item.createdAt as string),
      updatedAt: formatDate(item.updatedAt as string)
    };
  });
};

// 选中项
const selectList = ref<ArticleSecCategoryList>([]);
const handleSelectionChange = (items: ArticleSecCategoryList): void => {
  selectList.value = items;
};

// 查看
const viewForm = ref<ArticleSecCategory>({
  id: 0,
  name: '',
  description: '',
  articleCount: 0,
  parentName: '',
  createdAt: '',
  updatedAt: ''
});
const viewDialogVisible = ref<boolean>(false);
const handleView = (row: ArticleSecCategory): void => {
  viewForm.value = { ...row };
  viewDialogVisible.value = true;
};

// 添加
const addDialogVisible = ref<boolean>(false);
const addFormInstance = ref<FormInstance>();
const addFormRule = reactive<FormRules>({
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入分类描述', trigger: 'blur' }],
  parentId: [{ required: true, message: '请选择父级分类', trigger: 'blur' }]
});
const addForm = ref<ArticleSecCategory>({
  name: '',
  description: '',
  parentId: undefined
});
const handleAdd = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await addArticleSecCategoryApi({
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
const handleDelete = (row: ArticleSecCategory | ArticleSecCategoryList): void => {
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
      result = await deleteArticleSecCategoryApi(row.map((item) => item.id as number));
    } else {
      // 单个删除
      result = await deleteArticleSecCategoryApi(row.id as number);
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
const editForm = ref<ArticleSecCategory>({
  id: 0,
  name: '',
  description: '',
  parentId: undefined
});
const editFormRule = reactive<FormRules>({
  name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入标签描述', trigger: 'blur' }],
  parentId: [{ required: true, message: '请选择父级分类', trigger: 'blur' }]
});
const editDialogVisible = ref<boolean>(false);
const handleEdit = async (row: ArticleSecCategory): Promise<void> => {
  editForm.value = {
    id: row.id,
    name: row.name,
    description: row.description,
    parentId: row.parentId
  };
  editDialogVisible.value = true;
};
// 确认编辑
const handleConfirmEdit = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await updateArticleSecCategoryApi({
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

// 获取父级分类下拉框
const mainCategory = ref<ArticleCategoryList>();
const getMainCategory = async (): Promise<void> => {
  const { data } = await fetchArticleCategoryList();
  mainCategory.value = data.list.map((item: ArticleCategory) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description
    };
  });
};

// 获取数据
onBeforeMount(async () => {
  await getMainCategory();
  await getTableData();
});
</script>
