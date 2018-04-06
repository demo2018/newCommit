import http from 'utils/http';

const { get } = http.create('medical');
const { post } = http.create('medical');

// 获取推荐列表
export function getDetail(param) {
  return get(`/bhyy/core/doctorRecommend?presenter=${param.id}`);
}

// 医生详情
export function getInfo(param) {
  return get(`/bhyy/core/doctor/${param.id}`);
}

// 获取扫码信息信息
export function referral(param) {
  return post('/bhyy/core/referral/scan', param);
}
