import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'doctorCenter',

  state: {
    details: {},
    goodat: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/center': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'fetchGoods' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctorcenter.getInfo);
      yield update({ details: data });
    },
    //  擅长
    * fetchGoods({ payload }, { select, update, callWithLoading }) {
      const { good } = yield select(({ doctorCenter }) => doctorCenter);
      const { data } = yield callWithLoading(services.doctorcenter.goodAt, { good });
      yield update({ goodat: data });
    },
  },

  reducers: {
  }
});
