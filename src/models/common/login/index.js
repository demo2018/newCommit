import Model from 'utils/model';
import cookie from 'js-cookie';
import services from 'services';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default Model.extend({
  namespace: 'login',

  state: {},

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/login': () => {
          dispatch({ type: 'resetState' });
        },
      });
    }
  },

  effects: {
    * customerLoginCode({ param }, { callWithLoading }) {
      yield callWithLoading(services.login.customerLoginCode, param);
    },
    * customerLogin({ param }, { call, put }) {
      const result = yield call(services.login.customerLogin, {
        phone: param.phone.replace(/\s*/g, ''),
        code: param.code
      });
      const status = result.status;
      const expires = { expires: 7 };   // 设置cookie有效期
      if (status) {
        if (result.data.realName) {
          cookie.set('realName', result.data.realName, expires);
        }
        cookie.set('phone', result.data.phone, expires);
        cookie.set('id', result.data.id, expires);
        cookie.set('sessiobid', result.data.sessionId, expires);
        yield put(routerRedux.push('/user/center'));
      } else {
        Toast.info(result.error.message);
      }
    },
    * doctorLoginCode({ param }, { callWithLoading }) {
      yield callWithLoading(services.login.doctorLoginCode, param);
    },
    * doctorLogin({ param }, { call, put }) {
      const result = yield call(services.login.doctorLogin, {
        phone: param.phone.replace(/\s*/g, ''),
        code: param.code
      });
      const status = result.status;
      const expires = { expires: 7 };
      if (status) {
        if (result.data.realName) {
          cookie.set('realName', result.data.realName, expires);
        }
        cookie.set('phone', result.data.phone, expires);
        cookie.set('doctorid', result.data.id, expires);
        cookie.set('sessiobid', result.data.sessionId, expires);
        yield put(routerRedux.push('/doctor/center'));
      } else {
        Toast.info(result.error.message);
      }
    },
  },

  reducers: {

  }
});

