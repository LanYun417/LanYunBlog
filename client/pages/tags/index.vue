<template>
	<div class="tags-page">
		<ly-author-card />
		<section>
			<ly-card>
				<div class="overflow-hidden">
					<h2
						class="text-lg flex items-center justify-center text-center font-bold text-sky-500 dark:text-slate-300 mt-4 mb-2">
						<el-icon class="mr-2"><Ticket /></el-icon>
						标签 - {{ tagList.length }}
					</h2>
				</div>
				<!-- 标签列表 -->
				<div class="tag-list w-10/12 mx-auto">
					<ul class="w-full flex flex-wrap justify-center">
						<li v-scale class="tag-item m-2" v-for="tag in tagList" :key="tag.id">
							<nuxt-link :to="`/tagArticle?id=${tag.id}&name=${tag.name}`">
								<el-tag>
									{{ tag.name }}
								</el-tag>
							</nuxt-link>
						</li>
					</ul>
				</div>
				<!-- 无数据 -->
				<ly-empty v-show="emptyVisible" />
			</ly-card>
		</section>
	</div>
</template>

<script name="TagsPage" lang="ts" setup>
import type { SiteInfo, TagItem, TagList } from '~/types';

const tagStore = useTagStore();
await tagStore.getArticleTagList();
const tagList = computed<TagList>(() => tagStore.tagList);

// 无数据显示状态
const emptyVisible = computed(() => {
	return tagList.value.length === 0;
});

// 站点关键词
const keyword = computed(() => {
	return tagList.value
		.map((item: TagItem) => {
			return item.name;
		})
		.join(',');
});

const siteInfo = computed<SiteInfo>(() => {
	return useSiteStore().siteInfo;
});
useHead({
	title: `${siteInfo.value.title} - 标签`,
	meta: [
		{ name: 'keywords', content: keyword.value },
		{ name: 'description', content: siteInfo.value.description },
	],
});
</script>
