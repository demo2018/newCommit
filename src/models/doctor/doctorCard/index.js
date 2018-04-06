import Model from 'utils/model';
import services from 'services';
import cookie from 'js-cookie';

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
          dispatch({ type: 'postReferral' });
        },
      });
    }
  },

  effects: {
    //   获取推荐列表
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorCard }) => doctorCard);
      const { data } = yield callWithLoading(services.doctorcard.getDetail, { id });
      yield update({ list: data });
    },
    //  获取医生详情
    * fetchDoctorInfo({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorCard }) => doctorCard);
      const { data } = yield callWithLoading(services.doctorcard.getInfo, { id });
      yield update({ doctorInfo: data });
    },
    * postReferral({ payload }, { select, callWithLoading }) {
      const { id } = yield select(({ doctorCard }) => doctorCard);
      yield callWithLoading(services.doctorcard.referral, { doctorId: id, customerId: `${cookie.get('id')}` });
      localStorage.setItem('referral', 1);
    },
  },

  reducers: {
  }
});
