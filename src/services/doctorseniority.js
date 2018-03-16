import http from 'utils/http';
import cookie from 'js-cookie';

const { put } = http.create('medical');
const { get } = http.create('medical');

// 调取微信接口
export function getWechat(param) {
  return get('/bhyy/core/weixin/config?url=http://view.boheyayi.com:8060/', param);
}

// 提交审核
export function submitCheck(param) {
  return put(`/bhyy/core/doctor/${cookie.get('doctorid')}`, param);
}
