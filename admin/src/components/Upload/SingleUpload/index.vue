<template>
  <el-upload
    action=""
    ref="upload"
    class="upload-demo"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="true"
    :before-upload="beforeUpload"
    :accept="accept"
  >
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>
    <template #tip>
      <div class="el-upload__tip">限制上传1个文件，重复选择文件将覆盖原来的文件</div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { genFileId, type UploadInstance, type UploadProps, type UploadRawFile } from 'element-plus';

export default defineComponent({
  name: 'SingleUpload',
  props: {
    // 允许的文件类型，多个文件类型使用英文逗号隔开
    accept: {
      type: String,
      default: 'image/*'
    },
    // 文件上传回调
    handleUpload: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const upload = ref<UploadInstance>(); // 文件上传实例

    // 文件超出限制
    const handleExceed: UploadProps['onExceed'] = (files): void => {
      upload.value!.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      upload.value!.handleStart(file);
    };

    const beforeUpload = (file: any): boolean => {
      props.handleUpload(file);
      return false;
    };

    return {
      upload,
      beforeUpload,
      handleExceed
    };
  }
});
</script>
