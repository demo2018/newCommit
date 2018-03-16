import http from 'utils/http';

const { get } = http.create('medical');

// 获取预约中列表
export function getAppoint() {
  return get('/bhyy/core/doctor/appointment?status=1');
}

// 获取已完成列表
export function getDoneAppoint() {
  return get('/bhyy/core/doctor/bill');
}

// 获取已取消列表
export function getCancelAppoint() {
  return get('/bhyy/core/doctor/appointment?status=4');
}
