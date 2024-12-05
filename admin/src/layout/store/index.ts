import { defineStore } from 'pinia';
import type { SideNavItem, SideNavList, TabList } from '../types';
import { useRouter, type Router, type RouteRecordRaw } from 'vue-router';
import { localStorageGet, localStorageSet } from '@/utils/u.localStorage';

export const useLayoutStore = defineStore('layoutStore', () => {
  const router: Router = useRouter();

  // 侧边栏导航列表
  const sideNavList = computed<SideNavList>(() => {
    const list = router.options.routes.filter((route: RouteRecordRaw) => {
      return route.path === '/';
    })[0].children;
    return list as SideNavList;
  });

  // 默认激活导航项
  const defaultActiveNavItem = computed(() => {
    return router.currentRoute.value.name;
  });

  // 标签页列表
  const tabList = ref<TabList>([
    {
      name: 'Home',
      title: '首页',
      closable: false
    }
  ]);

  watch(
    tabList,
    (val) => {
      // 持久化存储TabList
      localStorageSet('tabList', JSON.stringify(val));
    },
    { deep: true }
  );

  // 关闭标签页
  const closeTab = (name: string): void => {
    const index: number = tabList.value.findIndex((item) => item.name === name);

    tabList.value.splice(index, 1);

    // 判断是否删除的是当前标签页
    const currentRoute = router.currentRoute.value.name;
    if (currentRoute === name) {
      if (tabList.value[index]) {
        // 删除当前标签页，跳转到后一个标签页
        router.push({ name: tabList.value[index].name });
      } else {
        // 删除当前标签页，跳转到前一个标签页
        router.push({ name: tabList.value[index - 1].name });
      }
    }
  };

  // 关闭所有标签页
  const closeAllTab = (): void => {
    tabList.value.splice(1);
    router.push({ name: 'Home' });
  };

  // 跳转（带参数的跳转不要使用）
  const goTo = (item: SideNavItem): void => {
    if (router.currentRoute.value.name === item.name) return;

    // 添加标签页
    const index: number = tabList.value.findIndex((tab) => tab.name === item.name);
    if (index === -1) {
      tabList.value.push({
        name: item.name,
        title: item.meta.title,
        closable: true
      });
    }

    router.push({ name: item.name });
  };

  // 当前屏幕宽度
  const screenWidth = ref<number>(window.innerWidth);

  // 当前屏幕模式
  const screenMode = computed<'mobile' | 'tablet' | 'desktop'>(() => {
    if (screenWidth.value <= 768) {
      return 'mobile';
    }

    if (screenWidth.value <= 1200) {
      return 'tablet';
    }

    return 'desktop';
  });

  // 侧边导航栏是否折叠
  const sideNavigationCollapse = ref<boolean>(false);

  watch(
    screenWidth,
    (val) => {
      if (val <= 1200) {
        sideNavigationCollapse.value = true;
      } else {
        sideNavigationCollapse.value = false;
      }
    },
    { immediate: true }
  );

  // 侧边栏容器宽度
  const asideWidth = computed<string>(() => {
    if (screenMode.value === 'mobile') {
      return '0';
    }

    if (sideNavigationCollapse.value) {
      return '64px';
    }

    return '210px';
  });

  onMounted(() => {
    // 获取 TabList
    const tabListStr = localStorageGet('tabList');
    if (tabListStr) {
      tabList.value = JSON.parse(tabListStr);
    }
  });

  return {
    goTo,
    tabList,
    closeTab,
    asideWidth,
    screenMode,
    screenWidth,
    sideNavList,
    closeAllTab,
    defaultActiveNavItem,
    sideNavigationCollapse
  };
});
