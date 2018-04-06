import http from 'utils/http';
import cookie from 'js-cookie';

const { post } = http.create('medical');
const { put } = http.create('medical');
const { get } = http.create('medical');

// 客户详情
export function getInfo() {
  return get(`/bhyy/core/customer/${cookie.get('id')}`, {});
}
// 更新客户详情
export function editInfo(param) {
  return put(`/bhyy/core/customer/${cookie.get('id')}`, param);
}
// 客户关系列表
export function getList() {
  return get(`/bhyy/core/customerRelation/?id=${cookie.get('id')}`);
}
// 客户关系详情
export function getListInfo(param) {
  return get(`/ bhyy/core/${cookie.get('id')}/customerRelation/${param.relationId}`, param);
}

// 调取微信接口
export function getWechat(param) {
  return get('/bhyy/core/weixin/config?url=http://test.zhenweitech.cn/', param);
}

// 调取图片上传接口
export function imgUpload(param) {
  return post(`/bhyy/core/image/weixin?serverId=${param}&type=image`);
}
