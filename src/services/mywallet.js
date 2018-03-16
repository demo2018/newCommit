import http from 'utils/http';
import cookie from 'js-cookie';

const { get } = http.create('medical');

// 获取账户
export function getWallet() {
  return get(`/bhyy/core/doctor/${cookie.get('doctorid')}`);
}

