import http from 'utils/http';
const { get } = http.create('medical');

// 用户登出
export function loginOut() {
  return get('/bhyy/user/logout');
}
