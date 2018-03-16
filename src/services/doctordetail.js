import http from 'utils/http';

const { get } = http.create('medical');

// 获取医生详情
export function getDetail(param) {
  return get(`/bhyy/core/doctor/${param.id}`);
}

//  获取医生出诊安排
export function getDoctorTime(param) {
  return get(`/bhyy/core/doctorConfig?doctorId=${param.id}`);
}

//  获取所有擅长标签
export function getTags(param) {
  return get('/bhyy/core/commentTag?typeId=3', param);
}
