import http from 'utils/http';

const { get } = http.create('medical');

// 获取账单列表
export function getBill() {
  return get('/bhyy/core/customer/bill');
}

// 获取项目名称
export function getProject(param) {
  return get('/bhyy/core/itemClass', param);
}
