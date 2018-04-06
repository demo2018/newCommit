import http from 'utils/http';

const { post } = http.create('medical');
const { get } = http.create('medical');

// 获取好评
export function getGood(param) {
  return get('/bhyy/core/commentTag?typeId=1', param);
}

// 获取好评
export function getBad(param) {
  return get('/bhyy/core/commentTag?typeId=2', param);
}

// 提交评论
export function evaluate(param) {
  return post('/bhyy/core/billComment', param);
}

// 调取微信接口
export function getWechat() {
  return get('/bhyy/core/weixin/config?url=http://test.zhenweitech.cn/');
}
