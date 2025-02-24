<template>
  <!-- 顶部导航 -->
  <div class="h-20">
    <!-- 导航 -->
    <div
      class="navigation h-[50px] shadow dark:shadow-md flex items-center justify-between relative z-50 dark:border-b dark:border-[#1e293b]"
    >
      <div class="left flex items-center">
        <div class="nav-tool" @click="collapseSideNavigation">
          <el-icon :size="iconSize" v-show="!layoutStore.sideNavigationCollapse"><Fold /></el-icon>
          <el-icon :size="iconSize" v-show="layoutStore.sideNavigationCollapse"><Expand /></el-icon>
        </div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right flex items-center">
        <div class="nav-tool" @click="fullScreenToggle()" title="切换全屏">
          <el-icon :size="iconSize"><FullScreen /></el-icon>
        </div>
        <div class="nav-tool" @click="darkStore.isDark = !darkStore.isDark" title="切换主题">
          <el-icon v-show="darkStore.isDark" :size="iconSize">
            <Moon />
          </el-icon>
          <el-icon v-show="!darkStore.isDark" :size="iconSize">
            <Sunny />
          </el-icon>
        </div>
        <div>
          <el-tag type="primary">你好，{{ userStore.userInfo?.nickname }}</el-tag>
        </div>
        <el-dropdown class="mx-2" trigger="click">
          <el-avatar :size="35" :src="userStore.userInfo?.avatar"></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goToProfile">个人中心</el-dropdown-item>
              <el-dropdown-item @click="changePasswordVisible = true">修改密码</el-dropdown-item>
              <el-dropdown-item @click="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 标签页 -->
    <el-scrollbar
      class="w-full shadow-md dark:shadow-lg relative pr-8 z-20 dark:border-b dark:border-[#1e293b]"
    >
      <div class="w-full h-[28px] flex items-center">
        <el-tag
          class="cursor-pointer mx-1"
          type="primary"
          round
          v-for="tag in tabList"
          :closable="tag.closable"
          :effect="tagIsActive(tag.name)"
          @click="$router.push({ name: tag.name })"
          @close="layoutStore.closeTab(tag.name)"
          :key="tag"
        >
          {{ tag.title }}
        </el-tag>
        <!-- 关闭全部 -->
        <div class="absolute right-0 top-0 h-full flex items-center px-2">
          <el-icon
            class="cursor-pointer hover:text-[#409EFF]"
            title="全部关闭"
            @click="layoutStore.closeAllTab()"
          >
            <Close />
          </el-icon>
        </div>
      </div>
    </el-scrollbar>
    <el-drawer v-model="drawerNavVisible" direction="ltr" :with-header="false" size="210px">
      <template #default>
        <SideNavigation :isCollapse="false" />
      </template>
    </el-drawer>
    <ElsDialog v-model="changePasswordVisible" title="修改密码">
      <el-form
        ref="changePasswordFormInstance"
        :model="changePasswordForm"
        :rules="changePasswordFormRule"
      >
        <el-form-item prop="oldPassword">
          <el-input
            v-model="changePasswordForm.oldPassword"
            type="password"
            placeholder="请输入原密码"
            show-password
          />
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            v-model="changePasswordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelChangePassword">取消</el-button>
        <el-button type="primary" @click="changePassword(changePasswordFormInstance)">
          确认
        </el-button>
      </template>
    </ElsDialog>
  </div>
</template>

<script lang="ts">
import screenfull from 'screenfull';
import type { TabList } from '../types';
import { useLayoutStore } from '../store/index';
import { useDarkStore } from '@/stores/darkStore';
import { changePasswordApi } from '@/api/api.user';
import SideNavigation from '../SideNavigation/index.vue';
import { localStorageRemove } from '@/utils/u.localStorage';
import { useRouter, type RouteLocationMatched } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { useUserStore } from '@/stores/userStore';

export default defineComponent({
  name: 'TopNavigation',
  components: { SideNavigation },
  setup() {
    const router = useRouter();
    const darkStore = useDarkStore();
    const userStore = useUserStore();
    const layoutStore = useLayoutStore();

    const drawerNavVisible = ref<boolean>(false);

    // 折叠侧边栏
    const collapseSideNavigation = (): void => {
      if (layoutStore.screenMode === 'mobile') {
        drawerNavVisible.value = true;
        return;
      }

      layoutStore.sideNavigationCollapse = !layoutStore.sideNavigationCollapse;
    };

    // 标签页列表
    const tabList = computed<TabList>(() => {
      return layoutStore.tabList;
    });

    // 标签是否高亮
    const tagIsActive = (routeName: string): string => {
      if (router.currentRoute.value.name === routeName) {
        return 'dark';
      }
      return 'plain';
    };

    const iconSize = ref<number>(20);

    // 全屏切换
    const fullScreenToggle = screenfull.toggle;

    // 面包屑导航列表
    const breadcrumbList = computed<RouteLocationMatched[]>(() => {
      return router.currentRoute.value.matched.filter((route): boolean => {
        return route.path !== '/' && route.path !== '/home';
      });
    });

    // 前往个人中心
    const goToProfile = (): void => {
      layoutStore.goTo({
        path: '/personalCenter',
        name: 'PersonalCenter',
        meta: {
          title: '个人中心'
        }
      });
    };

    // 修改密码
    const changePasswordFormInstance = ref<FormInstance>();
    const changePasswordVisible = ref<boolean>(false);
    const changePasswordForm = reactive({
      oldPassword: '',
      newPassword: ''
    });
    const changePasswordFormRule = reactive<FormRules>({
      oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
      newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
    });
    // 确认修改密码
    const changePassword = async (formEl: FormInstance | undefined): Promise<void> => {
      if (!formEl) return;
      await formEl.validate((valid: boolean) => {
        if (valid) {
          changePasswordApi(changePasswordForm).then((res: any) => {
            if (res.data.code === 200) {
              ElMessage.success(`${res.data.message}， 请重新登录`);
              localStorageRemove('token');
              router.replace('/login');
            }
          });
        }
      });
    };
    // 取消修改密码
    const cancelChangePassword = (): void => {
      changePasswordFormInstance.value?.resetFields();
      changePasswordVisible.value = false;
    };

    // 退出登录
    const logout = (): void => {
      localStorageRemove('token');
      ElMessage.success('退出登录');
      router.replace('/login');
    };

    return {
      logout,
      tabList,
      iconSize,
      darkStore,
      userStore,
      tagIsActive,
      goToProfile,
      layoutStore,
      changePassword,
      breadcrumbList,
      fullScreenToggle,
      drawerNavVisible,
      changePasswordForm,
      cancelChangePassword,
      changePasswordVisible,
      collapseSideNavigation,
      changePasswordFormRule,
      changePasswordFormInstance
    };
  }
});
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar) {
  height: 30px;
}

.nav-tool {
  width: 50px;
  height: 50px;
  display: flex;
  cursor: pointer;
  align-items: center;
  transition: color 0.3s;
  justify-content: center;

  &:hover {
    color: #409eff;
  }
}

:deep(.el-drawer__body) {
  padding: 0 !important;
  background-color: transparent !important;

  .el-scrollbar {
    height: 100%;
  }
}
</style>
