import http from 'utils/http';
import cookie from 'js-cookie';

const { put } = http.create('medical');
const { get } = http.create('medical');

// 医生详情
export function getInfo() {
  return get(`/bhyy/core/doctor/${cookie.get('doctorid')}`);
}
// 更新医生详情
export function editInfo(param) {
  return put(`/bhyy/core/doctor/${cookie.get('doctorid')}`, param);
}

// 获取可选科室
export function chooseTitle(param) {
  return get('/bhyy/core/itemClass?page=0&size=10', param);
}

// 获取擅长标签
export function goodAt(param) {
  return get('/bhyy/core/commentTag?typeId=3', param);
}

// 调取微信接口
export function getWechat() {
  return get('/bhyy/core/weixin/config?url=http://view.boheyayi.com:8060/');
}

// export function getWechat() {
//   return get(`/bhyy/core/weixin/config?url=${location.href.split('#')[0]}`);
// }
