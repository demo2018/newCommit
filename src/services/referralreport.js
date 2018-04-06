import http from 'utils/http';

const { post } = http.create('medical');

// 获取转证成功列表
export function referralSuccess(param) {
  return post('/bhyy/core/referraled', param);
}


// 获取转证中列表
export function referraling(param) {
  return post('/bhyy/core/referraling', param);
}
