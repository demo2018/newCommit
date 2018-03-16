import http from 'utils/http';
import cookie from 'js-cookie';

const { get } = http.create('medical');
const { post } = http.create('medical');

// 获取医生详情
export function getDetail(param) {
  return get(`/bhyy/core/doctor/${param.id}`, param);
}

// 获取可预约项目名称
export function getProject(param) {
  return get('/bhyy/core/itemClass?page=0&size=10', param);
}

// 新增预约
export function addAppoint(param) {
  return post('/bhyy/core/app/appointment', param);
}

// 获取可预约的就诊时间
export function appointTime(param) {
  return get(`/bhyy/core/doctorConfig?doctorId=${param.id}&status=0`);
}

// 为他人预约(新增关系成员)
export function addRelation() {
  return post(`/bhyy/core/${cookie.get('id')}/customerRelation`);
}

// 可选就诊人
export function onRelation() {
  return get(`/bhyy/core/customerRelation?id=${cookie.get('id')}`);
}
