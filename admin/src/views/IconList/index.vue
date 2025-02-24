<template>
  <div class="flex flex-wrap border-2 dark:border-gray-600">
    <template v-for="com in elementIcons" :key="com.name">
      <div
        class="iconItem text-xl flex flex-col items-center justify-evenly"
        @click="handleCopy(com.name)"
      >
        <el-icon>
          <component class="w-6 mt-4 mb-2" :is="com.component"></component>
        </el-icon>
        <div class="w-[70%] block truncate text-center text-xs" :title="com.name">
          {{ com.name }}
        </div>
      </div>
    </template>
  </div>
</template>

<script name="IconList" lang="ts" setup>
import { throttle } from 'lodash';
import { copyToClipboard } from '@/utils/u.copy';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const elementIcons = computed(() => {
  return Object.entries(ElementPlusIconsVue).map((icon) => {
    return {
      name: icon[0],
      component: icon[1]
    };
  });
});

const handleCopy = throttle(copyToClipboard, 800);
</script>

<style lang="scss" scoped>
.iconItem {
  width: 10%;
  height: 80px;
  display: flex;
  color: #606266;
  cursor: pointer;
  align-items: center;
  transition: all 0.5s;
  flex-direction: column;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

html.dark {
  .iconItem {
    color: #cbd5e1;
    border-color: #4b5563;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}

@media screen and (max-width: 1200px) {
  .iconItem {
    width: 20%;
  }
}
</style>
