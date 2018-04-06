import http from 'utils/http';

const { get } = http.create('medical');

// 获取父级可选项目详情
export function getTabs(param) {
  return get('/bhyy/core/itemClass?page=0&size=1000', { ...param, sort: 'rank,desc' });
}

// 获取子级可选项目详情
export function getProjects(param) {
  return get(`/bhyy/core/item?doctorClass=${param.id}`, { sort: 'rank,desc' });
}
