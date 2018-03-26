import http from 'utils/http';

const { get } = http.create('medical');
const { put } = http.create('medical');

// 获取客户已设置的通知设置
export function getNotice() {
  return get('/bhyy/core/notify');
}

//    客户更改通知设置接口
export function setNotice(param) {
  return put(`/bhyy/core/notify/${param.id}`, param.param);
}
