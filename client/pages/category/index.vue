<template>
	<div class="category-page">
		<ly-author-card />
		<section>
			<ly-card>
				<!-- 分类列表 -->
				<div class="category-list w-full flex flex-col items-center">
					<!-- 分类 -->
					<div class="w-8/12 mb-3" v-for="item in categoryList" :key="item.id">
						<h2
							class="text-lg cursor-pointer text-center font-bold text-sky-500 dark:text-slate-300 mt-4 mb-2">
							<i class="bi bi-grid-fill"></i>
							<nuxt-link
								class="mx-2"
								:to="`/categoryArticle?mainId=${item.id}&mainName=${item.name}`">
								{{ item.name }}
							</nuxt-link>
							<i class="bi bi-grid-fill"></i>
						</h2>
						<ul class="w-full flex flex-wrap justify-center">
							<li
								v-scale
								class="mx-2 my-1 px-2 duration-500 transition-transform hover:scale-110"
								v-for="sub in item.subCategories"
								:key="sub.id">
								<nuxt-link
									class="text-sm text-slate-500 block font-bold duration-300 transition-all dark:text-sky-500 hover:text-[#ff611e] hover:scale-110"
									:to="`/categoryArticle?mainId=${item.id}&subId=${sub.id}&mainName=${item.name}&subName=${sub.name}`">
									{{ sub.name }}
								</nuxt-link>
							</li>
						</ul>
					</div>
					<!-- 无数据 -->
					<ly-empty v-show="emptyVisible" />
				</div>
			</ly-card>
		</section>
	</div>
</template>

<script name="CategoryPage" lang="ts" setup>
import type { CategoryList, SiteInfo } from '~/types';

const categoryStore = useCategoryStore();
const categoryList = computed<CategoryList>(() => categoryStore.categoryList);

// 无数据显示状态
const emptyVisible = computed(() => {
	return categoryList.value.length === 0;
});

const siteInfo = computed<SiteInfo>(() => {
	return useSiteStore().siteInfo;
});
useHead({
	title: `${siteInfo.value.title} - 分类`,
	meta: [
		{
			name: 'keywords',
			content: '蓝云博客,分类,前端,后端,技术分享,Vue,React,Node.js,Python,Java,PHP',
		},
		{
			name: 'description',
			content: '蓝云博客是一个分享前端、后端、技术分享等内容的博客平台。',
		},
	],
});
</script>
