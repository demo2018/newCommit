import http from 'utils/http';

const { get } = http.create('medical');

// 获取已完成列表
export function getBill() {
  return get('/bhyy/core/doctor/bill');
}

