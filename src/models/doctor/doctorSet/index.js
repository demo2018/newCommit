import Model from 'utils/model';
import cookie from 'js-cookie';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'doctorSet',

  state: { },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/doctorset': () => {
          dispatch({ type: 'resetState' });
        },
      });
    }
  },

  effects: {
    *logout({ payload }, { put }) {
      cookie.remove('realName');
      cookie.remove('doctorid');
      cookie.remove('sessiobid');
      yield put(routerRedux.push('/login'));
    },
  },

  reducers: {

  }
});
