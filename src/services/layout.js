import http from 'utils/http';

const medical = http.create('medical');
const { post } = medical;

export function login(param) {
  return post('/common/web/login.do', param);
}
