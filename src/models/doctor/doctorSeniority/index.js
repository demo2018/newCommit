import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'doctorSeniority',

  state: {
    details: {},
    wechat: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/seniority': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'weChat' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorInfo }) => doctorInfo);
      const { data } = yield callWithLoading(services.doctorinfo.getInfo, { id });
      yield update({ details: data });
    },
    * submitCheck({ param }, { put, callWithLoading }) {
      const result = yield callWithLoading(services.doctorinfo.editInfo, param);
      if (result.status) {
        yield put(routerRedux.push('/doctor/center'));
      }
    },
    * weChat({ param }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctorseniority.getWechat);
      yield update({ wechat: data });
    },
  },

  reducers: {
  }
});
