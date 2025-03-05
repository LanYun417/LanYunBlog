<template>
  <div class="all-file">
    <!-- 表格数据 -->
    <div class="w-full h-[90%]">
      <RichTable
        :data="tableData"
        :fields="fields"
        @on-delete="handleDelete"
        @on-add="uploadVisible = true"
        @on-selectionChange="handleSelectionChange"
      >
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <el-button link type="success" size="small" @click="copyToClipboard(scope.row.url)">
              复制
            </el-button>
            <el-button link type="success" size="small" @click="handleDownload(scope.row)">
              下载
            </el-button>
            <el-button link type="danger" size="small" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
        <template #filter-r>
          <el-text>总文件大小：{{ totalSize }}</el-text>
        </template>
      </RichTable>
    </div>

    <!-- 上传文件 -->
    <ElsDialog v-model="uploadVisible" title="文件上传">
      <MultipleUpload ref="multipleUpload" :handle-upload="handleUpload" />
    </ElsDialog>

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

<script name="AllFile" lang="ts" setup>
import { formatDate } from '@/utils/u.dayjs';
import { copyToClipboard } from '@/utils/u.copy';
import { convertMemory } from '@/utils/u.convert';
import type { FileInfo, FileList } from '@/types';
import type { TableFields } from '@/components/RichTable/types';
import { deleteFileApi, downloadFileApi, fetchFileListApi, uploadFileApi } from '@/api/api.file';

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
const totalSize = ref<string>('0B');
const tableData = ref<FileList>([]);

// 表格字段
const fields: TableFields = [
  { type: 'text', label: 'ID', prop: 'id', sortable: true },
  { type: 'text', label: '文件名称', prop: 'name' },
  { type: 'text', label: '文件类型', prop: 'mimetype' },
  { type: 'text', label: '文件路径', prop: 'path' },
  { type: 'text', label: 'MD5', prop: 'md5' },
  { type: 'text', label: '文件大小', prop: 'size' },
  { type: 'text', label: '文件链接', prop: 'url' },
  { type: 'text', label: '创建时间', prop: 'createdAt' },
  { type: 'text', label: '更新时间', prop: 'updatedAt' }
];

// 获取列表数据
const getTableData = async (): Promise<void> => {
  const { data } = await fetchFileListApi(currentPage.value, pageSize.value);
  total.value = data.total;
  totalSize.value = convertMemory(data.totalSize);
  tableData.value = data.list.map((item: FileInfo) => {
    return {
      ...item,
      size: convertMemory(item.size),
      createdAt: formatDate(item.createdAt as string),
      updatedAt: formatDate(item.updatedAt as string)
    };
  });
};

// 选中项
const selectList = ref<FileList>([]);
const handleSelectionChange = (items: FileList): void => {
  selectList.value = items;
};

// 文件上传
const multipleUpload = ref<any>(null);
const uploadVisible = ref<boolean>(false);
const handleUpload = (file: File[]) => {
  uploadFileApi(file).then(async ({ data }) => {
    if (data.code === 200) {
      ElMessage.success('上传成功');
      uploadVisible.value = false;
      multipleUpload.value.clearFileList();
      await getTableData();
    }
  });
};

// 下载
const handleDownload = (row: FileInfo) => {
  downloadFileApi(row.id).then(({ data }) => {
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = row.name;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  });
};

// 删除
const handleDelete = (row: FileInfo | FileList): void => {
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
      result = await deleteFileApi(row.map((item) => item.id as number));
    } else {
      // 单个删除
      result = await deleteFileApi(row.id as number);
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
