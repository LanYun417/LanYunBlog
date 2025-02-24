<template>
	<!-- 标签文章页 -->
	<div class="tag-article-page">
		<!-- 页面标题 -->
		<div class="page-title">
			<h1
				class="flex items-center justify-center text-2xl font-bold text-sky-500 dark:text-slate-300">
				<el-icon class="mr-1">
					<Ticket />
				</el-icon>
				{{ tagName }}
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

<script name="TagArticlePage" lang="ts" setup>
import type { ArticleList, SiteInfo } from '~/types';
import { Ticket } from '@element-plus/icons-vue';

const route = useRoute();
const tagStore = useTagStore();

// 标签ID
const tagId = computed<number>(() => Number(route.query.id));
// 标签名称
const tagName = computed<string>(() => String(route.query.name));

// 分页
const pageSize = ref<number>(20); // 每页数量
const currentPage = ref<number>(1); // 当前页
const total = computed<number>(() => tagStore.articleCount); // 文章总数
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
	await tagStore.getArticleListByTag(tagId.value, currentPage.value, pageSize.value);
};
await getDataList();

// 文章列表
const articleList = computed<ArticleList>(() => tagStore.articleList);

const siteInfo = computed<SiteInfo>(() => {
	return useSiteStore().siteInfo;
});
useHead({
	title: `${siteInfo.value.title} - ${tagName.value}`,
	meta: [
		{ name: 'keywords', content: siteInfo.value.keywords },
		{ name: 'description', content: siteInfo.value.description },
	],
});
</script>
