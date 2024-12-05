<template>
  <div class="personal-center">
    <el-row>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">
        <el-form ref="formRef" label-width="60" :model="form" :rules="formRule">
          <el-form-item label="头像" prop="avatar">
            <el-avatar :size="80" :src="form.avatar" />
            <el-input class="mt-2" v-model="form.avatar" />
            <SingleUpload class="mt-2" :handleUpload="handleUpload" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname" />
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" disabled />
          </el-form-item>
          <el-form-item label="权限" prop="permission">
            <el-tag type="primary">{{ form.permissionName }}</el-tag>
          </el-form-item>
          <el-button type="primary" @click="t_handleSave(formRef)">保存更改</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script name="PersonalCenter" lang="ts" setup>
import { throttle } from 'lodash';
import { uploadFileApi } from '@/api/api.file';
import { updateUserInfoApi } from '@/api/api.user';
import type { FormInstance, FormRules } from 'element-plus';
import { useUserStore, type UserInfo } from '@/stores/userStore';

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

const formRef = ref<FormInstance>();

// 表单数据（用户信息）
const form = ref<UserInfo>({
  id: 0,
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  nickname: 'lanyun',
  username: 'lanyun',
  permissionId: 0,
  permissionName: 'admin'
});

// 表单规则
const formRule = reactive<FormRules>({
  avatar: [{ required: true, message: '请输入头像链接', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
});

// 上传头像
const handleUpload = (file: File) => {
  uploadFileApi(file).then((res: any) => {
    if (res.data.code === 200) {
      form.value.avatar = res.data.files[0].url;
    }
  });
};

// 保存更改
const handleSave = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate((valid: boolean) => {
    if (valid) {
      updateUserInfoApi({
        avatar: form.value.avatar,
        nickname: form.value.nickname
      }).then((res: any) => {
        if (res.data.code === 200) {
          userStore.fetchUserInfo(); // 更新用户信息
          ElMessage.success(res.data.message);
        }
      });
    }
  });
};
const t_handleSave = throttle(handleSave, 1000); // 防手抖

onBeforeMount(async () => {
  await userStore.fetchUserInfo();
  if (userInfo.value) {
    form.value = { ...userInfo.value };
  }
});
</script>
