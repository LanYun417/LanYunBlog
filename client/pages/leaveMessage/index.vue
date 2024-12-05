<template>
	<div class="leave-message-page">
		<ly-author-card />
		<section>
			<el-row justify="center">
				<el-col class="px-2" :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
					<div class="flex justify-between">
						<h2
							class="flex items-center font-bold text-lg text-sky-500 dark:text-slate-300">
							<el-icon class="mr-1"><Promotion /></el-icon>
							留言板
						</h2>
						<div v-scale class="emoji text-lg">❤️</div>
					</div>
				</el-col>
			</el-row>

			<div class="my-5"></div>

			<el-row v-scale justify="center">
				<el-col class="px-2" :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
					<el-form
						ref="formRef"
						:model="form"
						:rules="rules"
						label-width="90"
						label-position="top">
						<el-form-item label="留言内容" prop="message">
							<el-input v-model="form.message" type="textarea" :rows="5" />
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="form.email" />
						</el-form-item>
						<el-form-item label="验证码" prop="verifyCode">
							<el-row class="w-full" align="middle" justify="space-between">
								<el-col :span="15">
									<el-input v-model="form.verifyCode" />
								</el-col>
								<el-col :span="8">
									<div
										class="h-[33px] border-1 flex items-center justify-center bg-white rounded-sm">
										<div
											class="w-full h-full cursor-pointer"
											@click="captchaStore.getCaptcha"
											v-html="captcha"></div>
									</div>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<div class="mx-auto">
								<el-button type="primary" @click="handleSubmit(formRef)">
									提交
								</el-button>
								<el-button @click="t_handleTemporaryDraft">暂存草稿</el-button>
							</div>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</section>
	</div>
</template>

<script name="LeaveMessagePage" lang="ts" setup>
import type { SiteInfo } from '~/types';
import type { FormInstance, FormRules } from 'element-plus';

const captchaStore = useCaptchaStore();
const captcha = computed<string>(() => captchaStore.captcha); // SVG 验证码

const leaveMessageStore = useLeaveMessageStore();

const formRef = ref<FormInstance>();

// 申请表单
const form = reactive({
	message: '',
	email: '',
	verifyCode: '',
});

const rules = reactive<FormRules>({
	message: [{ required: true, message: '请输入留言内容', trigger: 'blur' }],
	email: [
		{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
		{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
	],
	verifyCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});

// 提交
const handleSubmit = async (formEl: FormInstance | undefined): Promise<void> => {
	if (!formEl) return;
	await formEl.validate(async (valid) => {
		const verifyCode: string = form.verifyCode.trim() || '';

		if (verifyCode.length < 1 || verifyCode === '') {
			ElMessage.error('请输入验证码！');
			return;
		}

		// 校验验证码
		const verifyResult: any = await captchaStore.verifyCaptcha(verifyCode);

		if (!verifyResult.success) return;

		if (valid) {
			await leaveMessageStore.publishLeaveMessage({ ...form }, verifyResult.token);
			await captchaStore.getCaptcha();
			formRef.value?.resetFields();
		}
	});
};

// 暂存草稿
const handleTemporaryDraft = (): void => {
	localStorage.setItem('leaveMessage', JSON.stringify(form));
	ElMessage.success('保存成功');
};
const t_handleTemporaryDraft = useThrottle(handleTemporaryDraft, 1000);

onBeforeMount(async () => {
	await captchaStore.getCaptcha(); // 获取验证码
	// 读取草稿
	const leaveMessage = localStorage.getItem('leaveMessage');
	if (leaveMessage) {
		const data = JSON.parse(leaveMessage);
		Object.assign(form, data);
	}
});

const siteInfo = computed<SiteInfo>(() => {
	return useSiteStore().siteInfo;
});
useHead({
	title: `${siteInfo.value.title} - 留言`,
	meta: [
		{ name: 'keywords', content: siteInfo.value.keywords },
		{ name: 'description', content: siteInfo.value.description },
	],
});
</script>
