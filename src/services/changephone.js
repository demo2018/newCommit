import http from 'utils/http';


const { put } = http.create('medical');
const { get } = http.create('medical');


// 更换手机号
export function changePhone(param) {
  return put('/bhyy/core/user/phone', param);
}

// 获取验证码
export function changeCode(param) {
  return get('/bhyy/customer/validate', param);
}
