import http from 'utils/http';

const medical = http.create('medical');
const { post } = medical;
const { get } = medical;

//  医生登陆
export function doctorLogin(param) {
  return post('/bhyy/doctor/login', param);
}
//  医生登陆验证码
export function doctorLoginCode(param) {
  return get('/bhyy/doctor/validate', param);
}
//  患者登陆
export function customerLogin(param) {
  return post('/bhyy/customer/login', param);
}
//  患者登陆验证码
export function customerLoginCode(param) {
  return get('/bhyy/customer/validate', param);
}

