import http from 'utils/http';
import cookie from 'js-cookie';

const { get } = http.create('medical');

// 医生详情接口
export function getInfo() {
  return get(`/bhyy/core/doctor/${cookie.get('doctorid')}`);
}
