import Model from 'utils/model';
import services from 'services';


export default Model.extend({
  namespace: 'doctorProfessional',

  state: {
    details: {},
    partment: [],
    goodat: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/professional': ({ params }) => {
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
    }
  },

  reducers: {
  }
});
