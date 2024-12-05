<template>
	<!-- 分类文章页 -->
	<div class="category-article-page">
		<!-- 页面标题 -->
		<div class="page-title">
			<h1
				class="flex items-center justify-center text-2xl font-bold text-sky-500 dark:text-slate-300">
				<el-icon :size="28" class="mr-1">
					<List />
				</el-icon>
				{{ pageTitle }}
			</h1>
		</div>

		<!-- 文章列表 -->
		<el-row class="my-3" justify="center">
			<el-col :xs="24" :sm="20" :md="20" :lg="16" :xl="16">
				<el-timeline>
					<el-timeline-item
						:key="article.id"
						type="primary"
						placement="top"
						v-for="article in articleList"
						:timestamp="article.publishTime"
						hollow>
						<div>
							<ly-card>
								<ly-article-card
									v-scale
									:title="article.title"
									:cover="article.cover"
									:abstract="article.content"
									:category="article.category"
									:publishTime="article.publishTime"
									:url="`/article?id=${article.id}`" />
							</ly-card>
						</div>
					</el-timeline-item>
				</el-timeline>
			</el-col>
		</el-row>

		<!-- 分页器 -->
		<div class="pagination w-full flex justify-center">
			<el-scrollbar>
				<els-pagination
					:total="total"
					:page-size="pageSize"
					:current-page="currentPage"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange" />
			</el-scrollbar>
		</div>
	</div>
</template>

<script name="CategoryArticlePage" lang="ts" setup>
import type { SiteInfo } from '~/types';

const route = useRoute();
const categoryStore = useCategoryStore();
const mainId = computed<number>(() => Number(route.query.mainId));
const subId = computed<number>(() => Number(route.query.subId));
const mainName = computed(() => route.query.mainName);
const subName = computed(() => route.query.subName);

const articleList = computed(() => categoryStore.articleList);

// 分页
const pageSize = ref<number>(20); // 每页数量
const currentPage = ref<number>(1); // 当前页
const total = computed<number>(() => categoryStore.articleCount); // 文章总数
const handleCurrentChange = async (val: number): Promise<void> => {
	currentPage.value = val;
	await getDataList();
};
const handleSizeChange = async (val: number): Promise<void> => {
	pageSize.value = val;
	await getDataList();
};

// 获取文章列表
const getDataList = async (): Promise<void> => {
	await categoryStore.getArticleListByCategory(
		mainId.value,
		subId.value,
		currentPage.value,
		pageSize.value
	);
};
await getDataList();

// 页面标题
const pageTitle = computed<string>(() => {
	if (!mainName.value && !subName.value) {
		return '分类';
	}
	if (!subName.value && mainName.value) {
		return mainName.value + '';
	}
	if (subName.value && !mainName.value) {
		return subName.value + '';
	}
	return `${mainName.value} > ${subName.value}`;
});

const siteInfo = computed<SiteInfo>(() => {
	return useSiteStore().siteInfo;
});
useHead({
	title: `${siteInfo.value.title} - ${pageTitle.value}`,
	meta: [
		{ name: 'keywords', content: siteInfo.value.keywords },
		{ name: 'description', content: siteInfo.value.description },
	],
});
</script>
