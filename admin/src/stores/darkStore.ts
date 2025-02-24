import { defineStore } from 'pinia';
import { localStorageGet, localStorageSet } from '@/utils/u.localStorage';

export const useDarkStore = defineStore('dark', () => {
  // 是否深色模式
  const isDark = ref<boolean>(false);

  // 切换深色模式
  const toggleDark = (): void => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  watch(isDark, () => {
    // 保存到 localStorage
    localStorageSet('isDark', JSON.stringify(isDark.value));
    toggleDark();
  });

  onMounted(() => {
    // 从 localStorage 读取深色模式
    const isDarkStr: string | null = localStorageGet('isDark');
    if (isDarkStr) {
      isDark.value = JSON.parse(isDarkStr);
    }
  });

  return {
    isDark
  };
});
