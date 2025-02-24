<template>
  <MdEditor
    v-model="content"
    :theme="isDark ? 'dark' : 'light'"
    :sanitize="handleSanitize"
    @on-upload-img="handleUploadImg"
  />
</template>

<script lang="ts">
import 'md-editor-v3/lib/style.css';
import { MdEditor } from 'md-editor-v3';
import { useDarkStore } from '@/stores/darkStore';

export default defineComponent({
  name: 'MarkdownEditor',
  components: { MdEditor },
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue', 'onUploadImg', 'getHtml'],
  setup(props, { emit }) {
    const darkStore = useDarkStore();
    const isDark = computed(() => darkStore.isDark);

    const content = ref<string>(props.modelValue);

    watch(
      () => props.modelValue,
      (val: string) => {
        content.value = val;
      }
    );

    // 上传图片
    const handleUploadImg = (files: File[], callback: Function): void => {
      emit('onUploadImg', files, callback);
    };

    watch(content, (val: string) => {
      emit('update:modelValue', val);
    });

    // 处理 html
    const handleSanitize = (html: string): string => {
      emit('getHtml', html);
      return html;
    };

    return {
      isDark,
      content,
      handleSanitize,
      handleUploadImg
    };
  }
});
</script>
