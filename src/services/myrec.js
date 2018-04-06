import http from 'utils/http';

const { post } = http.create('medical');

// 获取病历列表
export function getRecList() {
  return post('/bhyy/core/caseReport/customer/search');
}

