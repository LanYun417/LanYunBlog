import type { ArticleItem, ArticleList, TagList } from '~/types';

export const useTagStore = defineStore('tag', () => {
	const { $request } = useNuxtApp();

	// 标签列表
	const tagList = ref<TagList>([]);

	// 标签数量
	const tagCount = ref<number>(0);

	// 标签文章列表
	const articleList = ref<ArticleList>([]);

	// 文章总数
	const articleCount = ref<number>(0);

	// 获取文章标签列表
	const getArticleTagList = async (): Promise<void> => {
		const { data } = await useAsyncData('getArticleTagList', () => {
			return $request('/client/article/tag/list');
		});

		if ((data.value as any).code === 200) {
			tagList.value = (data.value as any).list;
			tagCount.value = (data.value as any).total;
		}
	};

	/**
	 * 根据标签获取文章列表
	 * @param tagId 标签ID
	 * @param currentPage 当前页
	 * @param pageSize 每页数量
	 */
	const getArticleListByTag = async (
		tagId: number,
		currentPage: number,
		pageSize: number
	): Promise<void> => {
		const result: any = await $request('/client/article/getAllByTag', {
			query: {
				tagId,
				currentPage,
				pageSize,
			},
		});

		if (result.code === 200) {
			articleList.value = result.list.map((item: ArticleItem) => {
				console.log('item: ', item);

				return {
					...item,
					category: [item.categoryName, item.secCategoryName],
					publishTime: formatDate(item.publishTime as string),
				};
			});
			articleCount.value = result.total;
		}
	};

	return {
		tagList,
		tagCount,
		articleList,
		articleCount,
		getArticleTagList,
		getArticleListByTag,
	};
});
