import http from 'utils/http';

const { get } = http.create('medical');

// 获取账单详情
export function getBill(param) {
  return get(`/bhyy/core/bill/${param.id}`);
}

// 获取好评
export function getGood(param) {
  return get('/bhyy/core/commentTag?typeId=1', param);
}

// 获取好评
export function getBad(param) {
  return get('/bhyy/core/commentTag?typeId=2', param);
}
