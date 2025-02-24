<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :close-on-click-modal="false"
    :width="dialogWidth"
  >
    <template #header>
      <slot name="header"> </slot>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="footer"> </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ElsDialog',
  props: {
    // 是否显示弹窗
    modelValue: {
      type: Boolean,
      required: true
    },
    // 弹窗标题
    title: {
      type: String,
      default: '提示'
    }
  },
  emit: ['update:modelValue'],
  setup(props, { emit }) {
    const dialogVisible = ref<boolean>(props.modelValue);

    watch(dialogVisible, (val) => {
      emit('update:modelValue', val);
    });

    watch(
      () => props.modelValue,
      (val) => {
        dialogVisible.value = val;
      }
    );

    const screenWidth = ref<number>(window.innerWidth);

    const dialogWidth = computed(() => {
      if (screenWidth.value <= 880) {
        return '95%';
      }
      return '500px';
    });

    onMounted(() => {
      window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth;
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', () => {});
    });

    return {
      dialogWidth,
      dialogVisible
    };
  }
});
</script>
