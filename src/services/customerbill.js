import http from 'utils/http';

const { get } = http.create('medical');

// 获取已完成列表
export function getBill() {
  return get('/bhyy/core/doctor/bill');
}

// 搜索已完成列表
export function getDoneAppoint(param) {
  return get('/bhyy/core/doctor/bill', param);
}

// 获取项目名称
export function getProject(param) {
  return get('/bhyy/core/itemClass', param);
}
