import http from 'utils/http';

const { get } = http.create('medical');

// 获取账单列表
export function getBill() {
  return get('/bhyy/core/customer/bill');
}

