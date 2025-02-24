import type { SiteInfo } from '~/types';

export const useSiteStore = defineStore('site', () => {
	const { $request } = useNuxtApp();

	const siteInfo = ref<SiteInfo>({
		id: 0,
		logo: '',
		title: '',
		domain: '',
		keywords: '',
		description: '',
		globalStyle: '',
		globalScript: '',
	});

	// 获取站点配置信息
	const getSiteInfo = async (): Promise<void> => {
		const { data } = await useAsyncData('getSiteInfo', () => {
			return $request('/client/site/config');
		});

		if ((data.value as any).code === 200) {
			siteInfo.value = {
				...(data.value as any).list[0],
			};
		}
	};

	return {
		siteInfo,
		getSiteInfo,
	};
});
