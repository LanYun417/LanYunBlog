import { defineStore } from 'pinia';
import type { HomeData } from '@/types';
import { fetchHomeDataApi } from '@/api/api.home';

export const useHomeStore = defineStore('home', () => {
  const homeData = ref<HomeData>({
    siteUrl: '',
    tagCount: 0,
    articleCount: 0,
    siteViewCount: 0,
    todayTagCount: 0,
    articleViewCount: 0,
    todayArticleCount: 0,
    todaySiteViewCount: 0,
    todayArticleViewCount: 0
  });

  const getHomeData = async (): Promise<void> => {
    const { data } = await fetchHomeDataApi();
    homeData.value = { ...data, message: undefined, code: undefined };
  };

  return { homeData, getHomeData };
});
