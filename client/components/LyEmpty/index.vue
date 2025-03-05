<template>
	<div class="ly-empty flex items-center justify-center pb-10 flex-col">
		<div class="py-3"></div>
		<img
			alt="empty.git"
			class="rounded-full w-[100px] dark:brightness-[80%] dark:hover:brightness-100"
			src="@/assets/empty.gif" />
		<div class="py-3"></div>
		<el-text size="large" type="info">{{ text }}</el-text>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	name: 'LyEmpty',
	props: {
		text: {
			type: String,
			default: '(✿◡‿◡) 抱歉，这里暂无数据哟 ~',
		},
	},
});
</script>
