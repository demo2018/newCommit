import http from 'utils/http';

const { post } = http.create('medical');

// 提交反馈
export function getFeedback(param) {
  return post('/bhyy/core/opinion', param);
}
