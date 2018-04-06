import http from 'utils/http';

const { get } = http.create('medical');

// 获取账户
export function getWallet() {
  return get('/bhyy/core/wallet');
}

// 按月检索
export function getMonthList(param) {
  return get('/bhyy/core/wallet/month', param);
}
