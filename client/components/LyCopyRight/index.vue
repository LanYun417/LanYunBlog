<template>
	<div v-once class="ly-copy-right w-full flex flex-col items-center justify-center py-2">
		<p class="text-xs text-slate-500 dark:text-slate-300">
			Copyright &copy; 2024 - {{ new Date().getFullYear() }} By LanYun All Rights
			Reserved.
		</p>
		<p class="text-xs text-slate-500 dark:text-slate-300 mt-2 flex items-center">
			<i class="bi bi-activity block mr-1"></i>
			站点已运行：{{ runTime }}
		</p>
	</div>
</template>

<script lang="ts">
import { getDaysElapsedSince, convertDaysToYearsMonthsDays } from '~/utils/u.date';

export default defineComponent({
	name: 'LyCopyRight',
	setup() {
		// 站点已运行时间
		const runTime = computed(() => {
			const daysElapsedSince = getDaysElapsedSince('2004-04-17');
			const { years, months, days } = convertDaysToYearsMonthsDays(daysElapsedSince);
			return `${years}年${months}月${days}天`;
		});

		return {
			runTime,
		};
	},
});
</script>

<style lang="scss" scoped>
.bi-activity {
	animation: throb 2s infinite linear;
}

@keyframes throb {
	0% {
		transform: scale(0.8);
	}
	25% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.2);
	}
	75% {
		transform: scale(1);
	}
	100% {
		transform: scale(0.8);
	}
}
</style>
