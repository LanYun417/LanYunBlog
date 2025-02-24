<template>
	<div class="friendly-link-page">
		<ly-author-card />
		<section>
			<ly-card>
				<!-- 友链列表 -->
				<div class="friendly-link-list w-full p-3">
					<h2
						class="flex items-center font-bold text-lg pl-3 text-sky-500 dark:text-slate-300">
						<el-icon class="mr-1"><HelpFilled /></el-icon>
						友情链接
					</h2>
					<el-row>
						<el-col
							class="friendly-link-item p-3"
							v-for="item in friendlyLinkList"
							:key="item.id"
							:xs="12"
							:sm="8"
							:md="6"
							:lg="6"
							:xl="4">
							<ly-friendly-link-card
								v-scale
								:url="item.url"
								:icon="item.icon"
								:name="item.name"
								:description="item.description" />
						</el-col>
					</el-row>
				</div>
			</ly-card>
			<div class="w-full mt-2">
				<ly-card>
					<!-- 友链申请 -->
					<div
						class="w-full flex items-center justify-center font-bold text-lg py-3 text-sky-500 dark:text-slate-300">
						<el-icon class="mr-1"><Promotion /></el-icon>
						<span>友链申请</span>
					</div>
					<el-row justify="center">
						<el-col class="px-2" :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
							<el-form ref="formRef" :model="form" :rules="rules" label-width="90">
								<el-form-item label="站点图标" prop="icon">
									<el-input v-model="form.icon" />
								</el-form-item>
								<el-form-item label="站点名称" prop="name">
									<el-input v-model="form.name" />
								</el-form-item>
								<el-form-item label="站点链接" prop="url">
									<el-input v-model="form.url" />
								</el-form-item>
								<el-form-item label="站点描述" prop="description">
									<el-input v-model="form.description" type="textarea" />
								</el-form-item>
								<el-form-item label="站长邮箱" prop="email">
									<el-input v-model="form.email" />
								</el-form-item>
								<el-form-item label="补充信息" prop="remark">
									<el-input v-model="form.remark" type="textarea" />
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
											提交申请
										</el-button>
										<el-button @click="t_handleTemporaryDraft">暂存草稿</el-button>
									</div>
								</el-form-item>
							</el-form>
						</el-col>
					</el-row>
				</ly-card>
			</div>
		</section>
	</div>
</template>

<script name="FriendlyLinkPage" lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import type { FriendlyLinkCreate, FriendlyLinkList, SiteInfo } from '~/types';

const captchaStore = useCaptchaStore();
const friendlyLinkStore = useFriendlyLinkStore();

// 友链列表
const friendlyLinkList = computed<FriendlyLinkList>(
	() => friendlyLinkStore.friendlyLinkList
);

// 获取友链列表
const getDataList = async (): Promise<void> => {
	await friendlyLinkStore.getFriendlyLinkList();
};
await getDataList();

const formRef = ref<FormInstance>();

// 申请表单
const form = reactive<FriendlyLinkCreate>({
	icon: '',
	name: '',
	description: '',
	email: '',
	remark: '',
	url: '',
	verifyCode: '',
});

const rules = reactive<FormRules>({
	icon: [{ required: true, message: '请输入站点icon图标链接', trigger: 'blur' }],
	name: [{ required: true, message: '请输入站点名称', trigger: 'blur' }],
	description: [{ required: true, message: '请输入站点描述', trigger: 'blur' }],
	url: [{ required: true, message: '请输入站点链接', trigger: 'blur' }],
	email: [
		{ required: true, message: '请输入站长邮箱地址', trigger: 'blur' },
		{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
	],
	verifyCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});

// 验证码
const captcha = computed<string>(() => captchaStore.captcha); // SVG 验证码

// 提交申请
const handleSubmit = async (formEl: FormInstance | undefined): Promise<void> => {
	if (!formEl) return;
	// 校验验证码
	await formEl.validate(async (valid) => {
		const verifyCode: string = (form.verifyCode as string).trim() || '';
		if (valid) {
			if (verifyCode.length < 1 || verifyCode === '') {
				ElMessage.error('请输入验证码！');
				return;
			}

			// 校验验证码
			const verifyResult: any = await captchaStore.verifyCaptcha(verifyCode);

			if (!verifyResult.success) return;

			await friendlyLinkStore.applyFriendlyLink(
				{ ...form, verifyCode: undefined },
				verifyResult.token
			);

			ElMessage.success('提交申请成功');
			await captchaStore.getCaptcha();
			formRef.value?.resetFields();
		}
	});
};

// 暂存草稿
const handleTemporaryDraft = (): void => {
	localStorage.setItem('friendlyLinkForm', JSON.stringify(form));
	ElMessage.success('保存成功');
};
const t_handleTemporaryDraft = useThrottle(handleTemporaryDraft, 1000);

onBeforeMount(async () => {
	await captchaStore.getCaptcha(); // 获取验证码
	// 读取草稿
	const friendlyLinkForm = localStorage.getItem('friendlyLinkForm');
	if (friendlyLinkForm) {
		const data = JSON.parse(friendlyLinkForm);
		Object.assign(form, data);
	}
});

const siteInfo = computed<SiteInfo>(() => {
	return useSiteStore().siteInfo;
});
useHead({
	title: `${siteInfo.value.title} - 友链`,
	meta: [
		{ name: 'keywords', content: siteInfo.value.keywords },
		{ name: 'description', content: siteInfo.value.description },
	],
});
</script>

<style lang="scss" scoped>
.friendly-link-item {
	transition: transform 0.3s ease-in-out;

	&:hover {
		transform: translateY(-0.3125rem);
	}
}
</style>
