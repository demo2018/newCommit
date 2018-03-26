import http from 'utils/http';
import cookie from 'js-cookie';

const { get } = http.create('medical');

// 获取推荐列表
export function getDetail(param) {
  return get('/bhyy/core/doctorRecommend?presenter=1', param);
}

// 医生详情
export function getInfo() {
  return get(`/bhyy/core/doctor/${cookie.get('doctorid')}`);
}
