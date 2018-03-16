import http from 'utils/http';


const { put } = http.create('medical');


// 更新预约
export function updateAppoint(param) {
  return put(`/bhyy/core/appointment/${param.id}`, param.param);
}
