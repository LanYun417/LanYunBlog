import type { ArticleItem, ArticleList } from '~/types';

export const useArticleStore = defineStore('article', () => {
	const { $request } = useNuxtApp();

	// 文章总数
	const articleCount = ref<number>(0);

	// 文章列表
	const articleList = ref<ArticleList>([]);

	// 获取文章列表
	const getArticleList = async (
		currentPage?: number,
		pageSize?: number,
		keyword: string = ''
	): Promise<void> => {
		let result: any = await $request('/client/article/list', {
			query: {
				currentPage,
				pageSize,
				keyword,
			},
		});

		if (result.code === 200) {
			articleList.value = result.list.map((item: ArticleItem) => {
				return {
					...item,
					category: [item.categoryName, item.secCategoryName],
					publishTime: formatDate(item.publishTime as string),
				};
			});
			articleCount.value = result.total;
		}
	};

	// 获取文章详情
	const articleDetail = async (id: number): Promise<ArticleItem | null> => {
		const result: any = await $request(`/client/article/details/${id}`);

		if (result.code === 200) {
			return {
				...result.article,
				createdAt: formatDate(result.article.createdAt),
			};
		}

		return null;
	};

	/**
	 * 根据分类获取文章列表
	 * @param category 分类格式（id-id），如：1-2
	 * @param currentPage 当前页
	 * @param pageSize 每页数量
	 */
	const getArticleListByCategory = async (
		category: string,
		currentPage?: number,
		pageSize?: number
	): Promise<void> => {
		const categoryId: number = Number(category.split('-')[0]);
		const secCategoryId: number = Number(category.split('-')[1]);
		const result: any = await $request('/client/article/getAllByCategory', {
			query: {
				categoryId,
				secCategoryId,
				currentPage,
				pageSize,
			},
		});

		if (result.code === 200) {
			articleList.value = result.list.map((item: ArticleItem) => {
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
		articleList,
		articleCount,
		articleDetail,
		getArticleList,
		getArticleListByCategory,
	};
});
