<template>
  <div class="article-manage">
    <!-- 表格数据 -->
    <div class="w-full h-[90%]">
      <RichTable
        :data="tableData"
        :fields="fields"
        @on-delete="handleDelete"
        @on-search="t_handleSearch"
        @on-add="goToPublishArticle"
        @on-selection-change="handleSelectionChange"
      >
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleView(scope.row)">
              <a :href="`${homeStore.homeData.siteUrl}/article?id=${scope.row.id}`" target="_blank">
                查看
              </a>
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

<script name="ArticleManage" lang="ts" setup>
import { throttle } from 'lodash';
import { formatDate } from '@/utils/u.dayjs';
import { useLayoutStore } from '@/layout/store';
import { useHomeStore } from '@/stores/homeStore';
import type { ArticleItem, ArticleList } from '@/types';
import type { TableFields } from '@/components/RichTable/types';
import { deleteArticleApi, fetchArticleListApi } from '@/api/api.article';

const router = useRouter();
const homeStore = useHomeStore();
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
const tableData = ref<ArticleList>([]);

// 表格字段
const fields: TableFields = [
  { type: 'text', label: 'ID', prop: 'id', sortable: true },
  { type: 'image', label: '文章封面', prop: 'cover' },
  { type: 'text', label: '文章标题', prop: 'title' },
  { type: 'text', label: '文章内容', prop: 'content' },
  { type: 'text', label: '一级分类', prop: 'categoryName' },
  { type: 'text', label: '二级分类', prop: 'secCategoryName' },
  { type: 'tag', label: '文章标签', prop: 'tags' },
  { type: 'text', label: '浏览量', prop: 'views' },
  { type: 'text', label: '发布时间', prop: 'publishTime' }
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
  const { data } = await fetchArticleListApi(currentPage.value, pageSize.value, keyword.value);
  total.value = data.total;
  tableData.value = data.list.map((item: ArticleItem) => {
    return {
      ...item,
      tags: item.tags.map((item) => item.name),
      publishTime: formatDate(item.publishTime as string)
    };
  });
};

// 选中项
const selectList = ref<ArticleList>([]);
const handleSelectionChange = (items: ArticleList): void => {
  selectList.value = items;
};

// 查看
const handleView = (row: ArticleItem): void => {
  console.log('handleView', row);
};

// 删除
const handleDelete = (row: any): void => {
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
      result = await deleteArticleApi(row.map((item) => item.id as number));
    } else {
      // 单个删除
      result = await deleteArticleApi(row.id as number);
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
const handleEdit = (row: ArticleItem): void => {
  router.push(`/editArticle?id=${row.id}`);
};

// 前往发布文章页面
const goToPublishArticle = (): void => {
  layoutStore.goTo({
    path: '/publishArticle',
    name: 'PublishArticle',
    meta: {
      title: '发布文章'
    }
  });
};

// 获取数据
onBeforeMount(async () => {
  await getTableData();
});
</script>
