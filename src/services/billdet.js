import http from 'utils/http';

const { post } = http.create('medical');
const { get } = http.create('medical');
const { put } = http.create('medical');

//  点击生成
export function sendBill(param) {
  return post('/bhyy/core/bill', param.param);
}

// 获取折扣

export function getDiscount() {
  return get('/bhyy/core/discount?page=0&size=10');
}

