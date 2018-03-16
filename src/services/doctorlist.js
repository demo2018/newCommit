import http from 'utils/http';

const { post } = http.create('medical');
const { get } = http.create('medical');

// 获取医生列表
export function getList(param) {
  return get('/bhyy/core/doctor?page=0&size=10', param);
}
// banner展示
export function gerBanner(param) {
  return post('/bhyy/core/banner/search', param);
}

// 搜索医生名字
export function gerDoctorName(param) {
  return post(`/bhyy/core/doctorConfig/name?name=${param.content}`, param);
}
