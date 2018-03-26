import Model from 'utils/model';
import services from 'services';


export default Model.extend({
  namespace: 'doctorCard',

  state: {
    list: [],
    doctorInfo: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/doctorcard/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'fetchDoctorInfo' });
        },
      });
    }
  },

  effects: {
    //   获取推荐列表
    * fetchDetails({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctorcard.getDetail);
      yield update({ list: data });
    },
    //  获取医生详情
    * fetchDoctorInfo({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorCard }) => doctorCard);
      const { data } = yield callWithLoading(services.doctorcard.getInfo, { id });
      yield update({ doctorInfo: data });
    },
  },

  reducers: {
  }
});
