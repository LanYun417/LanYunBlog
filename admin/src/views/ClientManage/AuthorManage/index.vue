<template>
  <div class="author-manage">
    <!-- 表格数据 -->
    <div class="w-full h-[90%]">
      <RichTable
        :data="tableData"
        :fields="fields"
        @on-delete="handleDelete"
        @on-search="t_handleSearch"
        @on-add="addDialogVisible = true"
        @on-selectionChange="handleSelectionChange"
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
          <el-form-item label="作者头像" prop="avatar">
            <div class="w-[100px] h-[100px]">
              <el-image :src="viewForm.avatar" />
            </div>
          </el-form-item>
          <el-form-item label="作者名称" prop="name">
            <div class="w-full truncate">{{ viewForm.name }}</div>
          </el-form-item>
          <el-form-item label="个性签名" prop="ps">
            <div class="w-full truncate">{{ viewForm.ps }}</div>
          </el-form-item>
          <el-form-item label="作者简介" prop="biography">
            <div class="w-full truncate">
              <el-input v-model="viewForm.biography" disabled type="textarea" />
            </div>
          </el-form-item>
          <el-form-item label="作者QQ" prop="qq">
            <div class="w-full truncate">{{ viewForm.qq }}</div>
          </el-form-item>
          <el-form-item label="作者微信" prop="wechat">
            <div class="w-full truncate">{{ viewForm.wechat }}</div>
          </el-form-item>
          <el-form-item label="作者邮箱" prop="email">
            <div class="w-full truncate">{{ viewForm.email }}</div>
          </el-form-item>
          <el-form-item label="Github" prop="github">
            <div class="w-full truncate">{{ viewForm.github }}</div>
          </el-form-item>
          <el-form-item label="作者微博" prop="weibo">
            <div class="w-full truncate">{{ viewForm.weibo }}</div>
          </el-form-item>
          <el-form-item label="是否启用" prop="isUse">
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
          <el-form-item label="作者头像" prop="avatar">
            <div class="h-[100px]">
              <el-image class="h-full" :src="addForm.avatar" />
            </div>
            <el-input class="mt-2" v-model="addForm.avatar" />
            <div class="mt-2">
              <SingleUpload :handleUpload="handleUpload" />
            </div>
          </el-form-item>
          <el-form-item label="作者名称" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入作者名称" />
          </el-form-item>
          <el-form-item label="个性签名" prop="ps">
            <el-input v-model="addForm.ps" placeholder="请输入个性签名" />
          </el-form-item>
          <el-form-item label="作者简介" prop="biography">
            <el-input v-model="addForm.biography" type="textarea" placeholder="请输入作者简介" />
          </el-form-item>
          <el-form-item label="作者QQ" prop="qq">
            <el-input v-model="addForm.qq" placeholder="请输入作者QQ" />
          </el-form-item>
          <el-form-item label="作者微信" prop="wechat">
            <el-input v-model="addForm.wechat" placeholder="请输入作者微信" />
          </el-form-item>
          <el-form-item label="作者邮箱" prop="email">
            <el-input v-model="addForm.email" placeholder="请输入作者邮箱" />
          </el-form-item>
          <el-form-item label="Github" prop="github">
            <el-input v-model="addForm.github" placeholder="请输入Github地址" />
          </el-form-item>
          <el-form-item label="作者微博" prop="weibo">
            <el-input v-model="addForm.weibo" placeholder="请输入微博主页链接" />
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
          <el-form-item label="作者头像" prop="avatar">
            <div class="h-[100px]">
              <el-image class="h-full" :src="editForm.avatar" />
            </div>
            <el-input class="mt-2" v-model="editForm.avatar" />
            <div class="mt-2">
              <SingleUpload :handleUpload="handleUpload" />
            </div>
          </el-form-item>
          <el-form-item label="作者名称" prop="name">
            <el-input v-model="editForm.name" placeholder="请输入作者名称" />
          </el-form-item>
          <el-form-item label="个性签名" prop="ps">
            <el-input v-model="editForm.ps" placeholder="请输入个性签名" />
          </el-form-item>
          <el-form-item label="作者简介" prop="biography">
            <el-input v-model="editForm.biography" type="textarea" placeholder="请输入作者简介" />
          </el-form-item>
          <el-form-item label="作者QQ" prop="qq">
            <el-input v-model="editForm.qq" placeholder="请输入作者QQ" />
          </el-form-item>
          <el-form-item label="作者微信" prop="wechat">
            <el-input v-model="editForm.wechat" placeholder="请输入作者微信" />
          </el-form-item>
          <el-form-item label="作者邮箱" prop="email">
            <el-input v-model="editForm.email" placeholder="请输入作者邮箱" />
          </el-form-item>
          <el-form-item label="Github" prop="github">
            <el-input v-model="editForm.github" placeholder="请输入Github地址" />
          </el-form-item>
          <el-form-item label="作者微博" prop="weibo">
            <el-input v-model="editForm.weibo" placeholder="请输入微博主页链接" />
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

<script name="AuthorManage" lang="ts" setup>
import {
  addAuthorInfoApi,
  deleteAuthorInfoApi,
  fetchAuthorInfoList,
  updateAuthorInfoApi
} from '@/api/api.author';
import { throttle } from 'lodash';
import { formatDate } from '@/utils/u.dayjs';
import { uploadFileApi } from '@/api/api.file';
import type { AuthorInfo, AuthorInfoList } from '@/types';
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
const tableData = ref<AuthorInfoList>([]);

// 表格字段
const fields: TableFields = [
  { type: 'text', label: 'ID', prop: 'id', sortable: true },
  { type: 'image', label: '作者头像', prop: 'avatar' },
  { type: 'text', label: '作者名称', prop: 'name' },
  { type: 'text', label: '个性签名', prop: 'ps' },
  { type: 'text', label: '作者简介', prop: 'biography' },
  { type: 'text', label: '作者QQ', prop: 'qq' },
  { type: 'text', label: '作者微信', prop: 'wechat' },
  { type: 'text', label: '作者邮箱', prop: 'email' },
  { type: 'link', label: 'Github', prop: 'github' },
  { type: 'link', label: '作者微博', prop: 'weibo' },
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
  const { data } = await fetchAuthorInfoList(currentPage.value, pageSize.value, keyword.value);
  total.value = data.total;
  tableData.value = data.list.map((item: AuthorInfo) => {
    return {
      ...item,
      createdAt: formatDate(item.createdAt as string),
      updatedAt: formatDate(item.updatedAt as string)
    };
  });
};

// 选中项
const selectList = ref<AuthorInfoList>([]);
const handleSelectionChange = (items: AuthorInfoList): void => {
  selectList.value = items;
};

// 查看
const viewForm = ref<AuthorInfo>({
  id: 0,
  avatar: '',
  name: '',
  ps: '',
  biography: '',
  qq: '',
  wechat: '',
  email: '',
  github: '',
  weibo: '',
  isUse: 'no',
  createdAt: '',
  updatedAt: ''
});
const viewDialogVisible = ref<boolean>(false);
const handleView = (row: AuthorInfo): void => {
  viewForm.value = { ...row };
  viewDialogVisible.value = true;
};

// 添加
const addDialogVisible = ref<boolean>(false);
const addFormInstance = ref<FormInstance>();
const addFormRule = reactive<FormRules>({
  name: [{ required: true, message: '请输入作者名称', trigger: 'blur' }],
  avatar: [{ required: true, message: '请输入作者头像链接', trigger: 'blur' }],
  email: [{ required: true, message: '请输入作者邮箱', trigger: 'blur' }]
});
const addForm = ref<AuthorInfo>({
  avatar: '',
  name: '',
  ps: '',
  biography: '',
  qq: '',
  wechat: '',
  email: '',
  github: '',
  weibo: '',
  isUse: 'no'
});
const handleAdd = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await addAuthorInfoApi({
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
const handleDelete = (row: AuthorInfo | AuthorInfoList): void => {
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
      result = await deleteAuthorInfoApi(row.map((item) => item.id as number));
    } else {
      // 单个删除
      result = await deleteAuthorInfoApi(row.id as number);
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
const editForm = ref<AuthorInfo>({
  id: 0,
  avatar: '',
  name: '',
  ps: '',
  biography: '',
  qq: '',
  wechat: '',
  email: '',
  github: '',
  weibo: '',
  isUse: 'no'
});
const editFormRule = reactive<FormRules>({
  name: [{ required: true, message: '请输入作者名称', trigger: 'blur' }],
  avatar: [{ required: true, message: '请输入作者头像链接', trigger: 'blur' }],
  email: [{ required: true, message: '请输入作者邮箱', trigger: 'blur' }]
});
const editDialogVisible = ref<boolean>(false);
const handleEdit = async (row: AuthorInfo): Promise<void> => {
  editForm.value = { ...row };
  editDialogVisible.value = true;
};
// 确认编辑
const handleConfirmEdit = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await updateAuthorInfoApi({
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
        editForm.value.avatar = res.data.files[0].url;
      }
      if (addDialogVisible.value) {
        addForm.value.avatar = res.data.files[0].url;
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
