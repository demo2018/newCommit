import http from 'utils/http';

const { get } = http.create('medical');
const { post } = http.create('medical');

// 获取父级可选项目详情
export function getTabs(param) {
  return get('/bhyy/core/itemClass?page=0&size=1000', param);
}

// 获取子级可选项目详情
export function getProjects(param) {
  return get(`/bhyy/core/item?doctorClass=${param.id}`);
}

// 获得咨询
export function getReferral(param) {
  return post('/bhyy/core/referral/consult', param);
}
