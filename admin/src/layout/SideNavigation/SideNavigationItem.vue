<template>
  <!-- 多级菜单 -->
  <el-sub-menu v-if="hasChildNode(sideNavItem) && !itemIsHidden" :index="sideNavItem.name">
    <template #title>
      <el-icon>
        <component :is="sideNavItem.meta.icon" />
      </el-icon>
      <span>{{ sideNavItem.meta.title }}</span>
    </template>
    <template v-for="child in sideNavItem.children">
      <el-menu-item
        class="sub-menu-item"
        v-if="!child.meta.hidden"
        :index="child.name"
        @click="layoutStore.goTo(child)"
        :key="child"
      >
        <el-icon>
          <component :is="child.meta.icon"> </component>
        </el-icon>
        <span>{{ child.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-sub-menu>

  <!-- 单级菜单 -->
  <el-tooltip
    class="box-item"
    effect="dark"
    :content="sideNavItem.meta.title"
    placement="right"
    :enterable="false"
    v-if="!hasChildNode(sideNavItem) && !itemIsHidden && isCollapse"
  >
    <el-menu-item :index="sideNavItem.name" @click="layoutStore.goTo(sideNavItem)">
      <el-icon>
        <component :is="sideNavItem.meta.icon" />
      </el-icon>
      <span>{{ sideNavItem.meta.title }}</span>
    </el-menu-item>
  </el-tooltip>

  <el-menu-item
    v-if="!hasChildNode(sideNavItem) && !itemIsHidden && !isCollapse"
    :index="sideNavItem.name"
    @click="layoutStore.goTo(sideNavItem)"
  >
    <el-icon>
      <component :is="sideNavItem.meta.icon" />
    </el-icon>
    <span>{{ sideNavItem.meta.title }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import type { SideNavItem } from '../types';
import { useLayoutStore } from '../store/index';

export default defineComponent({
  name: 'SideNavigationItem',
  props: {
    item: {
      type: Object as () => SideNavItem,
      required: true
    },
    isCollapse: {
      type: Boolean,
      required: true
    }
  },
  emits: [],
  setup(props) {
    // 侧边栏导航项
    const sideNavItem = computed<SideNavItem>(() => {
      return props.item;
    });

    // 是否隐藏
    const itemIsHidden = computed<boolean>(() => {
      if (sideNavItem.value.meta && sideNavItem.value.meta.hidden) {
        return true;
      }
      return false;
    });

    // 是否有子项
    const hasChildNode = (item: SideNavItem): boolean => {
      if (item.children && item.children.length > 0) {
        return true;
      }
      return false;
    };

    const layoutStore = useLayoutStore();

    return {
      sideNavItem,
      layoutStore,
      itemIsHidden,
      hasChildNode
    };
  }
});
</script>

<style lang="scss" scoped>
.sub-menu-item {
  background-color: #1f2d3d;

  &:hover {
    background-color: #001528;
  }
}

.tooltip-base-box {
  width: 600px;
}

html.dark {
  .sub-menu-item {
    background-color: #001528;

    &:hover {
      background-color: #2d4059;
    }
  }
}

.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tooltip-base-box .center {
  justify-content: center;
}

.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
