<template>
  <router-view />
</template>

<script name="App" lang="ts" setup>
import { ElMessage } from 'element-plus';
import { loginApi } from './api/api.user';
import { useUserStore } from './stores/userStore';
import { useHomeStore } from './stores/homeStore';
import { localStorageGet, localStorageRemove } from './utils/u.localStorage';

const router = useRouter();
const userStore = useUserStore();
const homeStore = useHomeStore();

console.log(
  `%c蓝云后台管理系统 v1.0.0`,
  'color: #fff; font-size: 12px; background-color: #409eff; border-radius: 5px; padding: 3px 10px;'
);

// 校验登录是否过期
const loginIsExpired = async (): Promise<void> => {
  const token: string | null = localStorageGet('token');
  if (!token) {
    return;
  }

  try {
    const result = await loginApi();
    if (result.data.code !== 200) {
      localStorageRemove('token'); // 删除 Token
      ElMessage.error('登录已过期，请重新登录');
      router.replace('/login');
    }
    userStore.fetchUserInfo(); // 获取用户资料
  } catch (error) {
    localStorageRemove('token'); // 删除 Token
    ElMessage.error('登录已过期，请重新登录');
    router.replace('/login');
  }
};

const init = async () => {
  await loginIsExpired();
  await homeStore.getHomeData();
};

onBeforeMount(async () => {
  await init();
});
</script>
