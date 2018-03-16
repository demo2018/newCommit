import moment from 'moment';
import serverConfigs from 'configs/servers';

// 获取当前环境
export function getDeployEnv(deployEnv) {
  if (arguments.length) {
    window.$$cachedEnv = window.DEPLOY_ENV || deployEnv || localStorage.getItem('DEPLOY_ENV') || 'dev';
  }
  return window.$$cachedEnv;
}
// 获取当前服务
export function getServer(servers = serverConfigs) {
  return servers[getDeployEnv(process.env.DEPLOY_ENV)];
}

// 格式化日期
export const formatDate = (date, type = 'YYYY-MM-DD HH:mm') => {
  console.log(date);
  return date ? moment(date).format(type) : '';
};

// 格式化日期为对应时间格式
export function toString(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (date == null || date === undefined) {
    return '';
  }
  if (!(date instanceof moment)) {
    date = moment(date);
  }
  return date.format(format);
}

// 格式化字符串为日期区间
export const getDateRangeValue = (createStartTime, createEndTime) => {
  const startTime = createStartTime ? moment(createStartTime) : null;
  const endTime = createStartTime ? moment(createEndTime) : null;
  return [startTime, endTime];
};

// 获取对象深层值
export const getValueFromObject = (datas = {}, keyStr) => {
  if (!keyStr) {
    return '';
  }
  const keys = keyStr.split('.');
  return keys.reduce((findDatas = {}, key) => {
    return findDatas[key];
  }, datas);
};

// 数字转化为千分位 1568=> 1,568
export const numToLocaleString = (source) => {
  if (source && typeof source === 'number') {
    return source.toLocaleString();
  }
  return source;
};

// 获取枚举值名称
export const getEnumsName = (enums = {}, findValue) => {
  if (Array.isArray(enums)) {
    const enumResult = enums.find(({ value }) => (value === findValue)) || {};
    return enumResult.label || '';
  }
  return enums[findValue] || '';
};
