<template>
  <div class="image-manage">
    <el-row class="mb-2 border-b pb-3" justify="space-between" align="middle">
      <div class="left">
        <el-button
          class="mr-2"
          size="small"
          type="success"
          icon="MagicStick"
          @click="changeMultiple"
        >
          {{ isMultiple ? '取消多选' : '多选' }}
        </el-button>
        <el-text type="info" size="small">已选中：{{ selectedList.length }}</el-text>
      </div>
      <div class="right">
        <el-text>总文件大小：{{ totalSize }}</el-text>
        <el-button
          class="ml-2"
          size="small"
          type="primary"
          icon="UploadFilled"
          @click="uploadVisible = true"
        >
          上传
        </el-button>
        <el-button
          size="small"
          type="danger"
          icon="Delete"
          v-show="isMultiple"
          @click="handleMultipleDelete"
        >
          删除
        </el-button>
      </div>
    </el-row>

    <!-- 图片列表 -->
    <el-row>
      <el-col
        v-for="(item, index) in imageList"
        :xs="12"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
        :key="item.id"
      >
        <div class="img-container w-full h-full p-1 overflow-hidden">
          <transition>
            <div class="check-modal" v-show="isMultiple" @click="item.selected = !item.selected">
              <div class="modal" v-show="item.selected">
                <el-icon :size="32" color="#409eff">
                  <Select />
                </el-icon>
              </div>
            </div>
          </transition>
          <el-image
            lazy
            fit="cover"
            :max-scale="7"
            :src="item.url"
            :zoom-rate="1.2"
            :min-scale="0.2"
            :initial-index="index"
            :preview-src-list="imageUrlList"
            style="width: 100%; height: 100%"
          />
          <div class="img-controls" v-show="!isMultiple">
            <el-button
              circle
              size="small"
              type="primary"
              icon="Download"
              title="下载图片"
              @click="handleDownload(item)"
            />
            <el-button
              circle
              size="small"
              type="success"
              title="复制图片链接"
              icon="CopyDocument"
              @click="copyToClipboard(item.url)"
            />
            <el-button
              circle
              size="small"
              type="danger"
              icon="Delete"
              title="删除图片"
              @click="handleDelete(item.id)"
            />
            <el-button circle icon="More" size="small" title="图片信息" @click="handleView(item)" />
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 上传图片 -->
    <ElsDialog v-model="uploadVisible" title="图片上传">
      <MultipleUpload ref="multipleUpload" :handle-upload="handleUpload" accept="image/*" />
      <template #footer>
        <div>
          <el-text>上传为 webp 格式</el-text>
          <el-switch
            class="ml-1"
            size="small"
            v-model="toWebp"
            active-value="yes"
            inactive-value="no"
          />
        </div>
      </template>
    </ElsDialog>

    <!-- 查看文件信息 -->
    <ElsDialog v-model="viewDialogVisible" title="文件信息">
      <el-form :model="viewForm" label-width="100">
        <el-form-item label="ID" prop="id">
          <div class="w-full truncate">{{ viewForm.id }}</div>
        </el-form-item>
        <el-form-item label="图片" prop="url">
          <div class="h-28">
            <el-image class="h-32" :src="viewForm.url" />
          </div>
        </el-form-item>
        <el-form-item label="文件名称" prop="name">
          <div class="w-full truncate">{{ viewForm.name }}</div>
        </el-form-item>
        <el-form-item label="文件类型" prop="mimetype">
          <div class="w-full truncate">{{ viewForm.mimetype }}</div>
        </el-form-item>
        <el-form-item label="文件路径" prop="path">
          <div class="w-full truncate">{{ viewForm.path }}</div>
        </el-form-item>
        <el-form-item label="文件MD5" prop="md5">
          <div class="w-full truncate">{{ viewForm.md5 }}</div>
        </el-form-item>
        <el-form-item label="文件大小" prop="size">
          <div class="w-full truncate">{{ viewForm.size }}</div>
        </el-form-item>
        <el-form-item label="文件链接" prop="url">
          <div class="w-full truncate">{{ viewForm.url }}</div>
        </el-form-item>
        <el-form-item label="创建时间" prop="createdAt">
          <el-tag>
            <div class="w-full truncate">{{ viewForm.createdAt }}</div>
          </el-tag>
        </el-form-item>
        <el-form-item label="更新时间" prop="updatedAt">
          <el-tag>
            <div class="w-full truncate">{{ viewForm.updatedAt }}</div>
          </el-tag>
        </el-form-item>
      </el-form>
    </ElsDialog>
  </div>
</template>

<script name="ImageManage" lang="ts" setup>
import { formatDate } from '@/utils/u.dayjs';
import { copyToClipboard } from '@/utils/u.copy';
import type { FileInfo, FileList } from '@/types';
import { convertMemory } from '@/utils/u.convert';
import {
  deleteFileApi,
  downloadFileApi,
  fetchImageFileListApi,
  uploadFileApi
} from '@/api/api.file';

const totalSize = ref<string>('0B');

// 分页
const total = ref<number>(0);

// 图片列表
const imageList = ref<FileList>([]);
// 图片 URL 列表
const imageUrlList = computed(() => imageList.value.map((item) => item.url));

// 获取图片列表
const getDataList = async (): Promise<void> => {
  const { data } = await fetchImageFileListApi();
  total.value = data.total;
  totalSize.value = convertMemory(data.totalSize);
  imageList.value = data.list.map((item: FileInfo) => {
    return {
      ...item,
      size: convertMemory(item.size),
      createdAt: formatDate(item.createdAt as string),
      updatedAt: formatDate(item.updatedAt as string)
    };
  });
};

// 上传图片
const multipleUpload = ref<any>(null);
const toWebp = ref<'yes' | 'no'>('no');
const uploadVisible = ref<boolean>(false);
const handleUpload = (file: File[]) => {
  uploadFileApi(file, toWebp.value).then(async ({ data }) => {
    if (data.code === 200) {
      ElMessage.success('上传成功');
      uploadVisible.value = false;
      multipleUpload.value.clearFileList(); // 清空上传列表
      await getDataList();
    }
  });
};

// 查看文件信息
const viewForm = ref<FileInfo>({
  id: 0,
  name: '',
  mimetype: '',
  path: '',
  md5: '',
  size: 0,
  url: '',
  createdAt: '',
  updatedAt: ''
});
const viewDialogVisible = ref<boolean>(false);
const handleView = (info: FileInfo): void => {
  viewForm.value = { ...info };
  viewDialogVisible.value = true;
};

// 删除
const handleDelete = (id: number): void => {
  ElMessageBox.confirm('删除后无法恢复，是否确认删除？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const { data } = await deleteFileApi(id);

    if (data.code === 200) {
      ElMessage.success(data.message);
      await getDataList();
    }
  });
};

// 多选
const isMultiple = ref<boolean>(false);
// 已选中的图片
const selectedList = computed<FileList>(() => imageList.value.filter((item) => item.selected));
// 切换多选状态
const changeMultiple = (): void => {
  isMultiple.value = !isMultiple.value;
  imageList.value.forEach((item) => {
    item.selected = false;
  });
};
// 多选删除
const handleMultipleDelete = async (): Promise<void> => {
  ElMessageBox.confirm('删除后无法恢复，是否确认删除？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const { data } = await deleteFileApi(selectedList.value.map((item: FileInfo) => item.id));

    if (data.code === 200) {
      ElMessage.success(data.message);
      isMultiple.value = false;
      await getDataList();
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

onBeforeMount(async () => {
  await getDataList();
});
</script>

<style lang="scss" scoped>
.img-container {
  position: relative;

  .check-modal {
    z-index: 50;
    top: 0.25rem;
    left: 0.25rem;
    display: flex;
    cursor: pointer;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: calc(100% - 0.5rem);
    height: calc(100% - 0.5rem);

    .modal {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  .img-controls {
    opacity: 0;
    display: flex;
    height: 2.5rem;
    bottom: -2.5rem;
    position: absolute;
    align-items: center;
    transition: all 0.3s;
    justify-content: center;
    width: calc(100% - 0.5rem);
    backdrop-filter: blur(10px);
    background-color: rgba(64, 158, 255, 0.5);
  }

  &:hover {
    .img-controls {
      opacity: 1;
      bottom: 0.25rem;
    }
  }
}
</style>
