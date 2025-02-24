import request from '@/utils/u.request';

// 获取验证码
export function getCaptchaApi() {
  return request.get('/client/captcha/get');
}

// 校验验证码
export function verifyCaptchaApi(captcha: string) {
  return request.post(`/client/captcha/verify?captcha=${captcha}`);
}
