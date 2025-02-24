<template>
	<div class="index-page">
		<ly-author-card />
		<section>
			<div class="article-list">
				<!-- 搜索文章 -->
				<el-row>
					<el-col class="mx-auto" :xs="24" :sm="22" :md="22" :lg="16" :xl="16">
						<ly-card>
							<ly-search-input v-model="keyword" @on-search="handleSearch" />
						</ly-card>
					</el-col>
				</el-row>

				<!-- 文章过滤 -->
				<el-row class="mt-3">
					<el-col class="mx-auto" :xs="24" :sm="22" :md="22" :lg="16" :xl="16">
						<ly-card>
							<div class="article-filter py-1">
								<div class="flex justify-between items-center">
									<!-- 选择文章分类 -->
									<div class="w-64 h-full flex items-center mx-2">
										<span
											class="whitespace-nowrap text-xs text-slate-500 dark:text-slate-300 mr-2">
											文章分类
										</span>
										<el-tree-select
											size="small"
											v-model="selected"
											:data="categorySelectList"
											:render-after-expand="false" />
									</div>
									<!-- 获取全部 -->
									<div
										@click="resetArticleList"
										class="h-full flex items-center mx-2 text-sky-300 hover:text-sky-500 cursor-pointer">
										<el-icon :size="16"><Refresh /></el-icon>
										<span class="text-xs">全部文章</span>
									</div>
								</div>
							</div>
						</ly-card>
					</el-col>
				</el-row>

				<!-- 文章列表 -->
				<el-row
					class="my-3"
					v-for="article in articleList"
					justify="center"
					:key="article.id">
					<el-col :xs="24" :sm="22" :md="22" :lg="16" :xl="16">
						<ly-card>
							<ly-article-card
								v-scale
								:title="article.title"
								:cover="article.cover"
								:views="article.views"
								:abstract="article.content"
								:category="article.category"
								:publishTime="article.publishTime"
								:url="`/article?id=${article.id}`" />
						</ly-card>
					</el-col>
				</el-row>

				<!-- 分页器 -->
				<div class="pagination w-full flex justify-center mt-3">
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
		</section>
	</div>
</template>

<script name="IndexPage" lang="ts" setup>
import type { ArticleList, SelectTree, SiteInfo } from '~/types';

// Article Store
const articleStore = useArticleStore();

// 搜索搜索
const keyword = ref<string>('');
const handleSearch = async () => {
	await getDataList();
};

// 分页
const pageSize = ref<number>(20); // 每页数量
const currentPage = ref<number>(1); // 当前页
const total = computed<number>(() => articleStore.articleCount); // 文章总数
const handleCurrentChange = async (val: number): Promise<void> => {
	currentPage.value = val;
	await getDataList();
};
const handleSizeChange = async (val: number): Promise<void> => {
	pageSize.value = val;
	await getDataList();
};

// 获取文章列表
const getDataList = async () => {
	await articleStore.getArticleList(currentPage.value, pageSize.value, keyword.value);
};
await getDataList();

// 文章列表
const articleList = computed<ArticleList>(() => {
	return articleStore.articleList;
});

// 分类选择树
const selected = ref<string>('');
const categoryStore = useCategoryStore();
const categorySelectList = computed<SelectTree>(() => categoryStore.categorySelectList);
// 根据分类获取文章列表
watch(selected, async (val: string) => {
	if (val.trim() === '' || val.trim().length < 1) return;
	await articleStore.getArticleListByCategory(val, currentPage.value, pageSize.value);
});

// 重置文章列表
const resetArticleList = async (): Promise<void> => {
	selected.value = '';
	await getDataList();
};

const siteInfo = computed<SiteInfo>(() => {
	return useSiteStore().siteInfo;
});
useHead({ title: `${siteInfo.value.title} - 首页` });
</script>
