import Model from 'utils/model';
import cookie from 'js-cookie';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'set',

  state: { },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/user/set': () => {
          dispatch({ type: 'resetState' });
        },
      });
    }
  },

  effects: {
    *logout({ payload }, { put }) {
      cookie.remove('realName');
      cookie.remove('id');
      cookie.remove('sessiobid');
      yield put(routerRedux.push('/login'));
    },
  },

  reducers: {

  }
});
