<template>
  <el-scrollbar>
    <el-menu
      active-text-color="#409EFF"
      background-color="#304156"
      class="el-menu-vertical-demo duration-500 transition-colors dark:shadow-md"
      :default-active="layoutStore.defaultActiveNavItem"
      text-color="#fff"
      :collapse="isCollapse"
    >
      <SideNavigationItem
        :is-collapse="isCollapse"
        v-for="item in navList"
        :key="item.name"
        :item="item"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { useLayoutStore } from '../store';
import type { SideNavList } from '../types';
import SideNavigationItem from './SideNavigationItem.vue';

export default defineComponent({
  name: 'SideNavigation',
  components: { SideNavigationItem },
  props: {
    sideNavList: {
      type: Array as () => SideNavList
    },
    isCollapse: {
      type: Boolean,
      required: false
    }
  },
  setup(props) {
    const layoutStore = useLayoutStore();

    const navList = computed<SideNavList>(() => {
      return props.sideNavList || layoutStore.sideNavList;
    });

    return {
      navList,
      layoutStore
    };
  }
});
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none !important;
}

:deep(.el-scrollbar__view) {
  height: 100%;
}

.el-scrollbar {
  background-color: #304156;
}

html.dark {
  .el-menu-vertical-demo {
    background-color: #1e293b;
  }

  .el-scrollbar {
    background-color: #1e293b;
  }
}
</style>
