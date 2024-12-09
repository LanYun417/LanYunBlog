import type {
	ArticleItem,
	ArticleList,
	CategoryItem,
	CategoryList,
	SelectTree,
} from '~/types';

export const useCategoryStore = defineStore('category', () => {
	const { $request } = useNuxtApp();

	// 文章列表
	const articleList = ref<ArticleList>([]);

	// 文章分类列表
	const categoryList = ref<CategoryList>([]);

	// 文章数量
	const articleCount = ref<number>(0);

	// 分类数量
	const categoryCount = ref<number>(0);

	// 分类选择列表
	const categorySelectList = computed<SelectTree>(() => {
		return categoryList.value.map((item: CategoryItem) => {
			return {
				value: item.id + '',
				label: item.name,
				children: item.subCategories.map((sub) => {
					return {
						value: `${item.id}-${sub.id}`,
						label: sub.name,
					};
				}),
			};
		});
	});

	// 获取文章分类列表
	const getArticleCategoryList = async (): Promise<void> => {
		const { data } = await useAsyncData('getArticleCategoryList', () => {
			return $request('/client/article/category/all');
		});

		if ((data.value as any).code === 200) {
			categoryList.value = (data.value as any).list;
			categoryCount.value = (data.value as any).total;
		}
	};

	// 根据文章分类获取文章列表
	const getArticleListByCategory = async (
		categoryId: number,
		secCategoryId: number,
		currentPage?: number,
		pageSize?: number
	): Promise<void> => {
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
		categoryList,
		articleCount,
		categoryCount,
		categorySelectList,
		getArticleCategoryList,
		getArticleListByCategory,
	};
});
