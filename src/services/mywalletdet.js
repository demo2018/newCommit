import http from 'utils/http';

const { get } = http.create('medical');

// 获取账户
export function getWallet() {
  return get('/bhyy/core/wallet');
}

