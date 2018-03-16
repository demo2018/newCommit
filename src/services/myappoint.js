import http from 'utils/http';

const { get } = http.create('medical');

// 获取预约详情
export function getNewAppoint(param) {
  return get(`/bhyy/core/customer/appointment?status=${param}`);
}
