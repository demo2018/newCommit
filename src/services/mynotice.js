import http from 'utils/http';

const { get } = http.create('medical');

// 获取通知列表
export function getNoticeList() {
  return get('/bhyy/core/notifyMessage');
}

