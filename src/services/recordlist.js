import http from 'utils/http';

const { post } = http.create('medical');

// 获取病历列表
export function getRecList(params) {
  return post('/bhyy/core/caseReport/doctor/search', params);
}

