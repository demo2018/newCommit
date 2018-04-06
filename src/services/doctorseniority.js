import http from 'utils/http';
import cookie from 'js-cookie';

const { put } = http.create('medical');
const { get } = http.create('medical');
const { post } = http.create('medical');

// 调取微信接口
export function getWechat() {
  return get('/bhyy/core/weixin/config?url=http://test.zhenweitech.cn/');
}

// 调取图片上传接口
export function imgUpload(param) {
  return post(`/bhyy/core/image/weixin?serverId=${param}&type=image`);
}

// 提交审核
export function submitCheck(param) {
  return put(`/bhyy/core/doctor/${cookie.get('doctorid')}`, param);
}
