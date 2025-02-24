import type { PhotoList } from '~/types';

export const usePhotoStore = defineStore('photo', () => {
	const { $request } = useNuxtApp();

	// 照片总数
	const total = ref<number>(0);

	// 照片列表
	const photoList = ref<PhotoList>([]);

	// 获取照片列表
	const getPhotoList = async (currentPage?: number, pageSize?: number): Promise<void> => {
		const result: any = await $request('/client/photo/list', {
			query: { currentPage, pageSize },
		});

		if (result.code === 200) {
			total.value = result.total;
			photoList.value = result.list;
		}
	};

	return {
		total,
		photoList,
		getPhotoList,
	};
});
