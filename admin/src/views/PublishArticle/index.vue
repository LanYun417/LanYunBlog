<template>
  <div class="publish-article" ref="publishArticlePage">
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
            <el-button type="primary" @click="t_handlePublish(formRef)">确认发布</el-button>
            <el-button type="success" @click="t_saveDraft">暂存草稿</el-button>
            <el-button @click="clearDraft">清空草稿</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script name="PublishArticle" lang="ts" setup>
import type {
  FileInfo,
  ArticleCreate,
  ArticleTagList,
  ArticleCategoryTree,
  ArticleCategoryTreeList
} from '@/types';
import { throttle } from 'lodash';
import { uploadFileApi } from '@/api/api.file';
import { useEventListener } from '@vueuse/core';
import { fetchArticleTagList } from '@/api/api.tag';
import { publishArticleApi } from '@/api/api.article';
import type { FormInstance, FormRules } from 'element-plus';
import { fetchArticleCategoryTree } from '@/api/api.category';
import { localStorageGet, localStorageRemove, localStorageSet } from '@/utils/u.localStorage';

// 表单
const formRef = ref<FormInstance>();
const form = reactive<ArticleCreate>({
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

const articleCategory = ref<string>(''); // 文章分类
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
  uploadFileApi(file, 'yes').then((res) => {
    if (res.data.code === 200) {
      form.cover = res.data.files[0].url;
    } else {
      ElMessage.error('上传失败');
    }
  });
};

// 编辑器图片上传
const handleEditorUploadImg = (files: File[], callback: Function): void => {
  uploadFileApi(files, 'yes').then(({ data }) => {
    callback(data.files.map((item: FileInfo) => item.url));
  });
};

// 确认发布文章
const handlePublish = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await publishArticleApi({ ...form });
      if (data.code === 201) {
        ElMessage.success(data.message);
        formRef.value?.resetFields();
        articleCategory.value = '';
        form.content = '';
      }
    }
  });
};
const t_handlePublish = throttle(handlePublish, 500);

// 暂存草稿
const saveDraft = (): void => {
  localStorageSet('publishDraft', JSON.stringify(form));
  ElMessage.success('已暂存草稿');
};
const t_saveDraft = throttle(saveDraft, 500);

const publishArticlePage = ref<HTMLDivElement>();
const cleanup = useEventListener(publishArticlePage, 'keydown', (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    saveDraft();
  }
});

// 加载草稿
const loadDraft = (): void => {
  const draft = localStorageGet('publishDraft');
  if (!draft) return;
  const draftData = JSON.parse(draft);
  // 文章分类处理
  if (draftData.categoryId === 0 || draftData.secCategoryId === 0) {
    articleCategory.value = '';
  } else {
    articleCategory.value = `${draftData.categoryId}-${draftData.secCategoryId}`;
  }
  Object.assign(form, { ...draftData });
};

// 清空草稿
const clearDraft = (): void => {
  ElMessageBox.confirm('是否确认清空草稿？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    formRef.value?.resetFields();
    articleCategory.value = '';
    form.content = '';
    localStorageRemove('publishDraft');
    ElMessage.success('已清空草稿');
  });
};

onBeforeMount(async () => {
  await getCategoryTree();
  await getTagList();
  loadDraft();
});

onBeforeUnmount(() => {
  cleanup();
});
</script>
