import http from 'utils/http';
import cookie from 'js-cookie';

const { get } = http.create('medical');

// 客户详情接口
export function getInfo() {
  return get(`/bhyy/core/customer/${cookie.get('id')}`);
}
