<template>
  <div class="w-full h-full min-h-[520px] bg-[#2D3A4B]">
    <el-row class="h-[500px]" justify="center" align="middle">
      <el-col :xs="20" :sm="15" :md="10" :lg="7">
        <h1 class="text-white font-bold text-2xl mb-5" align="center">蓝云后台管理系统</h1>
        <el-form
          ref="loginForm"
          :model="loginFormData"
          :rules="loginFormRule"
          @submit.native.prevent
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginFormData.username"
              placeholder="用户名"
              autofocus
              @keydown.enter="d_handleLogo(loginForm)"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginFormData.password"
              type="password"
              placeholder="密码"
              prop="password"
              show-password
              @keydown.enter="d_handleLogo(loginForm)"
            />
          </el-form-item>
          <el-form-item prop="captcha">
            <div class="w-full flex justify-between items-center">
              <el-col :span="15">
                <el-input class="w-full" v-model="loginFormData.captcha" placeholder="验证码" />
              </el-col>
              <el-col :span="8">
                <div class="h-[33px] border-1 flex items-center justify-center bg-white rounded-sm">
                  <div
                    class="w-full h-full cursor-pointer"
                    v-html="captchaSvg"
                    @click="t_getCaptcha"
                  ></div>
                </div>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="w-full" type="primary" @click="d_handleLogo(loginForm)">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script name="Login" lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginApi } from '@/api/api.user';
import { debounce, throttle } from 'lodash';
import { getCaptchaApi, verifyCaptchaApi } from '@/api/api.captcha';
import { useUserStore } from '@/stores/userStore';
import { localStorageSet } from '@/utils/u.localStorage';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';

const router = useRouter();
const userStore = useUserStore();

const loginForm = ref<FormInstance>();

const loginFormData = reactive({
  username: '',
  password: '',
  captcha: ''
});

const loginFormRule = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
});

// 处理登录
const handleLogin = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      // 校验验证码
      const { data } = await verifyCaptchaApi(loginFormData.captcha);

      if (data.code !== 200) return;

      // 登录
      const loginResult = await loginApi(
        loginFormData.username,
        loginFormData.password,
        data.token
      );

      if (loginResult.data.code === 200) {
        ElMessage.success(loginResult.data.message);

        // 保存 Token
        const token: string = loginResult.headers.authorization;
        localStorageSet('token', token);

        // 获取用户信息
        userStore.fetchUserInfo();

        // 前往首页
        router.replace('/home');
      }
    }
  });
};
const d_handleLogo = debounce(handleLogin, 1000, { leading: true, trailing: false });

// 获取验证码
const captchaSvg = ref<string>('');
const getCaptcha = async () => {
  const result = await getCaptchaApi();

  captchaSvg.value = result.data;
};
const t_getCaptcha = throttle(getCaptcha, 1000);

onBeforeMount(async () => {
  await getCaptcha();
});
</script>
