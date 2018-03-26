import http from 'utils/http';

const { get } = http.create('medical');
const { post } = http.create('medical');

// 获取预约中列表
export function getAppoint(param) {
  return post('/bhyy/core/doctor/appointment', param);
}

// 获取已完成列表
export function getDoneAppoint(param) {
  return get('/bhyy/core/doctor/bill', param);
}

// 获取已取消列表
export function getCancelAppoint(param) {
  return post('/bhyy/core/doctor/appointment', param);
}

// 获取项目名称
export function getProject(param) {
  return get('/bhyy/core/itemClass', param);
}
