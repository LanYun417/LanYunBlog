<template>
  <div class="edit-article">
    <el-form ref="formRef" :model="form" label-width="90" :rules="formRule">
      <el-form-item label-width="0" prop="content">
        <MarkdownEditor
          class="mb-1"
          v-model="form.content"
          @on-upload-img="handleEditorUploadImg"
        />
      </el-form-item>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入文章标题" />
          </el-form-item>
          <el-form-item label="文章封面" prop="cover">
            <el-image class="w-48" :src="form.cover" />
            <el-input class="mt-2" v-model="form.cover" placeholder="请输入文章封面链接" />
            <div class="mt-2">
              <SingleUpload :handleUpload="handleUploadCover" />
            </div>
          </el-form-item>
          <el-form-item label="文章分类" prop="categoryId">
            <el-tree-select
              v-model="articleCategory"
              :data="categoryTreeOptions"
              :render-after-expand="false"
              placeholder="请选择文章分类"
            />
          </el-form-item>
          <el-form-item label="文章标签" prop="tagsId">
            <el-select v-model="form.tagsId" multiple clearable placeholder="请选择文章标签">
              <el-option
                v-for="item in tagsOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="t_handleSave(formRef)">保存更改</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script name="EditArticle" lang="ts" setup>
import type {
  ArticleCreate,
  FileInfo,
  ArticleTagList,
  ArticleCategoryTree,
  ArticleCategoryTreeList,
  ArticleTag
} from '@/types';
import { throttle } from 'lodash';
import { uploadFileApi } from '@/api/api.file';
import { fetchArticleTagList } from '@/api/api.tag';
import type { FormInstance, FormRules } from 'element-plus';
import { fetchArticleCategoryTree } from '@/api/api.category';
import { getArticleDetailsApi, updateArticleApi } from '@/api/api.article';

const route = useRoute();

// 表单
const formRef = ref<FormInstance>();
const form = reactive<ArticleCreate>({
  id: 0,
  title: '',
  cover: '',
  content: '',
  categoryId: 0,
  secCategoryId: 0,
  tagsId: [] as number[]
});
const formRule = reactive<FormRules>({
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传文章封面或输入文章封面链接', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
  tagsId: [{ required: true, message: '请选择文章标签', trigger: 'blur' }]
});

// 文章分类
const articleCategory = ref<string>('');
watch(articleCategory, (val: string) => {
  if (val.indexOf('-') === -1) return;
  form.categoryId = Number(val.split('-')[0]); // 文章一级分类
  form.secCategoryId = Number(val.split('-')[1]); // 文章二级分类
});

// 获取文章分类树
const categoryTree = ref<ArticleCategoryTreeList>([]);
const getCategoryTree = async (): Promise<void> => {
  const { data } = await fetchArticleCategoryTree();
  categoryTree.value = data.list;
};
const categoryTreeOptions = computed(() => {
  return categoryTree.value.map((item: ArticleCategoryTree) => {
    return {
      value: item.id,
      label: item.name,
      children: item.subCategories.map((sec) => {
        return {
          value: `${item.id}-${sec.id}`,
          label: sec.name
        };
      })
    };
  });
});

// 获取文章标签列表
const tagsOptions = ref<ArticleTagList>([]);
const getTagList = async (): Promise<void> => {
  const { data } = await fetchArticleTagList();
  tagsOptions.value = data.list;
};

// 上传文章封面
const handleUploadCover = (file: File) => {
  uploadFileApi(file).then((res) => {
    if (res.data.code === 200) {
      form.cover = res.data.files[0].url;
    } else {
      ElMessage.error('上传失败');
    }
  });
};

// 编辑器图片上传
const handleEditorUploadImg = (files: File[], callback: Function): void => {
  uploadFileApi(files).then(({ data }) => {
    callback(data.files.map((item: FileInfo) => item.url));
  });
};

// 保存更改
const handleSave = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await updateArticleApi({ ...form });
      if (data.code === 200) {
        ElMessage.success(data.message);
      }
    }
  });
};
const t_handleSave = throttle(handleSave, 500);

// 获取要修改的文章详情
const getArticle = async (): Promise<void> => {
  const id: number = Number(route.query.id);
  const { data } = await getArticleDetailsApi(id);
  Object.assign(form, {
    title: data.article.title,
    cover: data.article.cover,
    content: data.article.content,
    tagsId: data.article.tags.map((item: ArticleTag) => item.id)
  });
  articleCategory.value = `${data.article.categoryId}-${data.article.secCategoryId}`;
};

onBeforeMount(async () => {
  form.id = Number(route.query.id);
  await getCategoryTree();
  await getTagList();
  await getArticle();
});
</script>
