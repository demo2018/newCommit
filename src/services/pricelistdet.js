import http from 'utils/http';

const { get } = http.create('medical');

// 获取项目详情
export function getDetails(param) {
  return get(`/bhyy/core/item/${param.id}`);
}
