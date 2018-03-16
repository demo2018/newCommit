import http from 'utils/http';


const { put } = http.create('medical');


// 更换手机号
export function changePhone(param) {
  return put('/bhyy/core/user/phone', param);
}
