import { fetchUserInfoApi } from '@/api/api.user';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';

export type UserInfo = {
  id: number;
  nickname: string;
  avatar: string;
  username: string;
  permissionId: number;
  permissionName: string;
};

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null);

  const fetchUserInfo = async (): Promise<void> => {
    const result = await fetchUserInfoApi();
    if (result.data.code === 200) {
      userInfo.value = result.data.user;
      return;
    }
    ElMessage.error('获取用户信息失败');
  };

  return {
    userInfo,
    fetchUserInfo
  };
});
