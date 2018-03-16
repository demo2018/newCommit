import Model from 'utils/model';
import services from 'services';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'cancelReason',

  state: {
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/user/cancelreason/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
        },
      });
    }
  },

  effects: {
    * updateAppoint({ param }, { select, put, callWithLoading }) {
      const { id } = yield select(({ cancelReason }) => cancelReason);
      const result = yield callWithLoading(services.cancelreason.updateAppoint, { id, param });
      const status = result.status;
      if (status) {
        Toast.info('取消成功', 1);
        yield put(routerRedux.push('/user/myappoint'));
      }
    },
  },

  reducers: {

  }
});
