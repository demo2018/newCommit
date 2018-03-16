import http from 'utils/http';
import cookie from 'js-cookie';

const { post } = http.create('medical');
const { get } = http.create('medical');
const { put } = http.create('medical');

// 获取客户关系详情
export function getRelation(param) {
  return get(`/bhyy/core/${param.id}/customerRelation/${param.relation}`);
}
// 更新客户关系
export function upDateRelation(param) {
  return put(`/bhyy/core/${param.id}/customerRelation/${param.relation}`, param.param);
}
// 添加客户关系
export function addRelation(param) {
  return post(`/bhyy/core/${cookie.get('id')}/customerRelation`, param);
}
