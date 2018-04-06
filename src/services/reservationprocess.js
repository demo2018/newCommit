import http from 'utils/http';

const { get } = http.create('medical');

// 获取转诊详情
export function referralProcess(param) {
  return get(`/bhyy/core/referral/detail/${param.id}`);
}
