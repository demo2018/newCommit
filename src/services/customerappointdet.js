import http from 'utils/http';

const { get } = http.create('medical');

// 获取预约详情
export function getAppointDet(param) {
  return get(`/bhyy/core/appointment/${param.id}`);
}

// 获取项目名称
export function getProject(param) {
  return get('/bhyy/core/itemClass', param);
}
