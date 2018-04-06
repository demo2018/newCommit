import http from 'utils/http';

const { get } = http.create('medical');

// 获取病历列表
export function getRecDetails(params) {
  return get('/bhyy/core/caseReport/2');
}

