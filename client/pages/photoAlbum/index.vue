<template>
	<div class="photo-album-page">
		<ly-author-card />
		<section>
			<ly-card>
				<div class="p-3">
					<h2
						class="flex items-center font-bold text-lg pl-3 text-sky-500 dark:text-slate-300">
						<el-icon class="mr-1"><PictureFilled /></el-icon>
						相册
					</h2>
				</div>
				<div class="photo-list gap-1 px-3">
					<div class="photo-item p-2" v-for="p in photoList" :key="p.id">
						<ly-photo-item :url="p.url" :description="p.description" v-scale />
					</div>
				</div>
			</ly-card>
		</section>
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
</template>

<script name="PhotoAlbumPage" lang="ts" setup>
import type { PhotoList, SiteInfo } from '~/types';

const photoStore = usePhotoStore();

// 照片列表
const photoList = computed<PhotoList>(() => photoStore.photoList);

// 分页
const pageSize = ref<number>(20); // 每页数量
const currentPage = ref<number>(1); // 当前页
const total = computed(() => photoStore.total);
const handleCurrentChange = async (val: number): Promise<void> => {
	currentPage.value = val;
	await getDataList();
};
const handleSizeChange = async (val: number): Promise<void> => {
	pageSize.value = val;
	await getDataList();
};

// 获取照片列表
const getDataList = async (): Promise<void> => {
	await photoStore.getPhotoList(currentPage.value, pageSize.value);
};
await getDataList();

const siteInfo = computed<SiteInfo>(() => {
	return useSiteStore().siteInfo;
});
useHead({
	title: `${siteInfo.value.title} - 相册`,
	meta: [
		{ name: 'keywords', content: siteInfo.value.keywords },
		{ name: 'description', content: siteInfo.value.description },
	],
});
</script>

<style lang="scss" scoped>
.photo-list {
	column-count: 5;

	@media screen and (max-width: 1200px) {
		column-count: 4;
	}

	@media screen and (max-width: 992px) {
		column-count: 3;
	}

	@media screen and (max-width: 768px) {
		column-count: 2;
	}

	@media screen and (max-width: 576px) {
		column-count: 1;
	}

	.photo-item {
		transition: transform 0.3s ease-in-out;

		&:hover {
			transform: scale(1.05);
		}
	}
}
</style>
