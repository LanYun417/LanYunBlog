<template>
	<!-- 文章浏览页 -->
	<div class="article-page relative">
		<!-- 文章信息 -->
		<div class="article-info mb-3">
			<!-- 文章标题 -->
			<h1
				v-scale
				title="文章标题"
				class="title w-10/12 mx-auto text-center font-bold text-3xl tracking-wider text-sky-500 dark:text-slate-300">
				{{ articleInfo.title }}
			</h1>
			<!-- 发布时间/文章分类 -->
			<div
				class="w-10/12 mx-auto mt-5 flex items-center justify-center text-center text-sm text-gray-500 dark:text-slate-300">
				<!-- 发布时间 -->
				<div class="flex items-center justify-center">
					<el-icon class="mr-1"><Calendar /></el-icon>
					发布时间：{{ articleInfo.createdAt }}
				</div>
				<div class="line w-[0.0625rem] h-3 mx-1 bg-gray-500 dark:bg-slate-300"></div>
				<!-- 文章分类 -->
				<div class="flex items-center justify-center">
					<el-icon class="mr-1"><List /></el-icon>
					文章分类：
					<el-breadcrumb separator-icon="ArrowRight">
						<el-breadcrumb-item>
							<span class="cursor-pointer duration-500 hover:text-sky-500">
								{{ articleInfo.categoryName }}
							</span>
						</el-breadcrumb-item>
						<el-breadcrumb-item>
							<span class="cursor-pointer duration-500 hover:text-sky-500">
								{{ articleInfo.secCategoryName }}
							</span>
						</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
			</div>
			<!-- 文章标签 -->
			<div class="w-10/12 mx-auto mt-3 flex items-center justify-center text-center">
				<nuxt-link
					:key="tag.id"
					v-for="tag in articleInfo.tags"
					:to="`/tagArticle?id=${tag.id}&name=${tag.name}`">
					<el-tag class="mx-1 cursor-pointer">
						{{ tag.name }}
					</el-tag>
				</nuxt-link>
			</div>
		</div>
		<!-- 文章内容 -->
		<ly-card>
			<div class="article-content relative flex">
				<!-- MdPreview 预览编辑器 -->
				<MdPreview
					editorId="preview-only"
					style="background-color: transparent"
					:theme="mdTheme"
					:modelValue="articleInfo.content" />
				<!-- 目录 -->
				<div
					class="catalogue transition-all duration-500 h-full p-3 sticky top-5 right-0 truncate"
					:class="{ 'w-0': !catalogueVisible, 'w-56': catalogueVisible }">
					<div class="open absolute left-0 cursor-pointer">
						<i
							v-show="!catalogueVisible"
							@click="catalogueVisible = true"
							class="bi bi-caret-left-fill text-sky-500 dark:text-slate-300"
							title="展开目录"></i>
						<i
							@click="catalogueVisible = false"
							v-show="catalogueVisible"
							class="bi bi-caret-right-fill text-sky-500 dark:text-slate-300"
							title="收起目录"></i>
					</div>
					<MdCatalog editorId="preview-only" :scrollElement="scrollElement" />
				</div>
			</div>
		</ly-card>
	</div>
</template>

<script name="ArticlePage" lang="ts" setup>
import 'md-editor-v3/lib/preview.css';
import type { SiteInfo } from '~/types';
import { MdPreview, MdCatalog } from 'md-editor-v3';

const route = useRoute();
const darkStore = useDarkStore();
const screenStore = useScreenStore();
const articleStore = useArticleStore();

const articleInfo: any = await articleStore.articleDetail(Number(route.query.id));

// 编辑器主题
const mdTheme = computed<'dark' | 'light'>(() => {
	return darkStore.isDark ? 'dark' : 'light';
});

// MdCatalog 滚动元素
const scrollElement = ref<HTMLElement>();

// 目录展开/收起状态（自动）
const autoCatalogueVisible = computed(() => {
	return !(screenStore.screenWidth <= 768);
});
// 目录展开/收起状态（手动）
const catalogueVisible = ref(autoCatalogueVisible.value);
watch(autoCatalogueVisible, (val: boolean) => {
	catalogueVisible.value = val;
});

onBeforeMount(() => {
	scrollElement.value = document.documentElement;
});

const siteInfo = computed<SiteInfo>(() => {
	return useSiteStore().siteInfo;
});
useHead({
	title: `${siteInfo.value.title} - ${articleInfo.title}`,
	meta: [
		{ name: 'keywords', content: articleInfo.tags.map((item) => item.name).join(',') },
		{ name: 'description', content: articleInfo.content.slice(0, 150) + '...' },
	],
});
</script>

<style lang="scss" scoped>
:deep(.medium-zoom-image) {
	border: none !important;
}

.title {
	overflow: hidden;
	display: -webkit-box;
	line-clamp: 2;
	box-orient: vertical;
	-webkit-line-clamp: 2; // 控制多行的行数
	-webkit-box-orient: vertical;
}
</style>
