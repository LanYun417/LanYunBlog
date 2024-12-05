<template>
	<div
		class="ly-photo-item relative rounded-md shadow-md hover:shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.05]">
		<img
			class="transition-all duration-500 dark:brightness-[80%] dark:hover:brightness-100"
			:src="url"
			:alt="description" />
		<!-- 下载图片 -->
		<div
			class="download absolute right-1 bottom-1 z-10 flex items-center text-xs text-slate-300">
			<a :href="url" download>
				<el-icon :size="14"><Download /></el-icon>
			</a>
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	name: 'LyPhotoItem',
	props: {
		url: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: '',
		},
	},
});
</script>
