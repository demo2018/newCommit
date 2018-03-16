const mock = require('mockjs');
const utils = require('./utils');

const mockData = mock.mock({
  'users|1-10': [
    {
      'id|+1': 1,
      'age|+1': 15,
      'name|+1': 'john',
      career: '软件工程师',
      gender: 'male',
      createTime: 1482705955000
    }
  ],
});

  Object.assign(global, mockData);

module.exports = {
  'POST /web/user/list': utils.createResponse('users'),
};
