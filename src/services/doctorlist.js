import http from 'utils/http';

const { post } = http.create('medical');
const { get } = http.create('medical');

// banner展示
export function gerBanner(param) {
  return post('/bhyy/core/banner/search', param);
}

// 获取医生列表
export function gerDoctorList(param) {
  return post('/bhyy/core/doctor/search/app', { ...param, sort: 'rank,desc' });
}

// 搜索项目列表
export function getServiceItems(param) {
  return get('/bhyy/core/itemClass', param);
}

// 获得咨询
export function getReferral(param) {
  return post('/bhyy/core/referral/consult', param);
}
