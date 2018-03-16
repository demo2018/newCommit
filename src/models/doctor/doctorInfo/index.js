import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';


export default Model.extend({
  namespace: 'doctorInfo',

  state: {
    details: {},
    partment: [],
    goodat: [],
    wechat: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/info': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'fetchTitles' });
          dispatch({ type: 'fetchGoods' });
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
    //  科室选择
    * fetchTitles({ payload }, { select, update, callWithLoading }) {
      const { title } = yield select(({ doctorInfo }) => doctorInfo);
      const { data } = yield callWithLoading(services.doctorinfo.chooseTitle, { title });
      yield update({ partment: data });
    },
    //  擅长
    * fetchGoods({ payload }, { select, update, callWithLoading }) {
      const { good } = yield select(({ doctorInfo }) => doctorInfo);
      const { data } = yield callWithLoading(services.doctorinfo.goodAt, { good });
      yield update({ goodat: data });
    },
    * changeInfo({ payload: { param } }, { callWithLoading }) {
      yield callWithLoading(services.doctorinfo.editInfo, param);
    },
    * updateName({ payload: { param } }, { put, callWithLoading }) {
      yield callWithLoading(services.doctorinfo.editInfo, param);
      yield put(routerRedux.push('/doctor/info'));
    },
    * weChat({ param }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctorinfo.getWechat);
      yield update({ wechat: data });
    },
  },

  reducers: {
  }
});
