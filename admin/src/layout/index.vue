<template>
  <div class="common-layout">
    <el-container>
      <el-aside :style="{ width: layoutStore.asideWidth }">
        <slot name="aside">
          <SideNavigation :is-collapse="layoutStore.sideNavigationCollapse" />
        </slot>
      </el-aside>
      <el-container>
        <el-header>
          <slot name="header">
            <TopNavigation />
          </slot>
        </el-header>
        <el-main>
          <slot name="main">
            <div class="w-full h-full p-[20px] relative">
              <router-view />
            </div>
          </slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { useLayoutStore } from './store/index';
import TopNavigation from './TopNavigation/index.vue';
import SideNavigation from './SideNavigation/index.vue';

export default defineComponent({
  name: 'LayoutCom',
  components: {
    SideNavigation,
    TopNavigation
  },
  setup() {
    const layoutStore = useLayoutStore();

    onMounted(() => {
      window.addEventListener('resize', () => {
        layoutStore.screenWidth = window.innerWidth;
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', () => {});
    });

    return {
      layoutStore
    };
  }
});
</script>

<style lang="scss" scoped>
.el-aside,
.common-layout,
.el-container {
  height: 100%;
}

.el-header {
  padding: 0;
}

.el-header {
  height: fit-content;
}

.el-aside {
  max-width: 210px;
  width: fit-content;
  transition: width 0.5s;
}

.el-main {
  padding: 0;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #409eff;
  }

  &::-webkit-scrollbar-track {
    background-color: #eee;
  }
}
</style>
