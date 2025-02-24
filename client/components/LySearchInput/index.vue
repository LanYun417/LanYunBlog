<template>
	<div
		class="ly-search-input flex items-center border-white justify-center border-2 dark:border-sky-500 rounded-md pr-2">
		<input
			@keydown.enter="handleSearch"
			v-model="content"
			class="searchInput w-full text-sky-500 py-1 text-xs pl-3 outline-none bg-transparent"
			type="search"
			:placeholder="placeholder" />
		<button
			@click="handleSearch"
			class="ml-1 text-sky-300 duration-500 transition-colors hover:text-sky-500 flex items-center">
			<el-icon :size="14" title="搜索"><Search /></el-icon>
		</button>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	name: 'LySearchInput',
	props: {
		modelValue: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			default: '输入关键词搜索',
		},
	},
	emits: ['update:modelValue', 'onSearch'],
	setup(props, { emit }) {
		const content = ref<string>(props.modelValue);

		const handleSearch = (): void => {
			emit('onSearch', content.value);
		};

		watch(content, (val: string) => {
			emit('update:modelValue', val);

			if (val.trim() === '' || val.length < 1) {
				handleSearch();
			}
		});

		return {
			content,
			handleSearch,
		};
	},
});
</script>

<style lang="scss" scoped>
// 搜索框
.searchInput {
	&::placeholder {
		color: #7dd3fc;
		font-size: 0.75rem;
	}
}
</style>
