<template>
  <div class="w-full h-full">
    <el-upload
      drag
      multiple
      action=""
      :limit="limit"
      ref="uploadRef"
      :accept="accept"
      class="upload-demo"
      :auto-upload="false"
      :on-change="onChange"
      :before-upload="beforeUpload"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽文件到此处上传<em>或点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">最大同时上传数量：{{ limit }}</div>
      </template>
    </el-upload>
    <el-button class="w-full h-full" type="primary" @click="submitUpload">开始上传</el-button>
  </div>
</template>

<script lang="ts">
import { type UploadInstance } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'MultipleUpload',
  props: {
    // 允许的文件类型，多个文件类型使用英文逗号隔开
    accept: {
      type: String,
      default: '*'
    },
    // 最大同时上传数量
    limit: {
      type: Number,
      default: 10
    },
    // 文件上传回调
    handleUpload: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const fileList = reactive<any[]>([]);
    const uploadRef = ref<UploadInstance>();

    const submitUpload = (): void => {
      uploadRef.value!.submit();
      props.handleUpload(fileList);
    };

    const onChange = (e: any): void => {
      if (e.raw && e.raw !== void 0) {
        fileList.push(e.raw);
      }
    };

    const beforeUpload = (): boolean => {
      return false;
    };

    // 清空文件列表
    const clearFileList = (): void => {
      fileList.splice(0, fileList.length);
    };

    return {
      onChange,
      uploadRef,
      beforeUpload,
      submitUpload,
      clearFileList
    };
  }
});
</script>
