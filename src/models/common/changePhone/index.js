import Model from 'utils/model';
import services from 'services';
import { Toast } from 'antd-mobile';


export default Model.extend({
  namespace: 'changePhone',

  state: {
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/common/changephone': () => {
          dispatch({ type: 'resetState' });
        },
      });
    }
  },

  effects: {
    //  获取验证码
    * changeCode({ param }, { callWithLoading }) {
      yield callWithLoading(services.changephone.changeCode, { phone: param.replace(/\s*/g, '') });
    },
    //  更换手机号
    * changePhone({ param }, { call }) {
      const result = yield call(services.changephone.changePhone, {
        phone: param.phone.replace(/\s*/g, ''),
        code: param.code
      });
      if (result.status) {
        Toast.info('更换成功', 1);
      } else {
        Toast.info(result.error.message, 1);
      }
    },
  },

  reducers: {

  }
});
