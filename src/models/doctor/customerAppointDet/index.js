import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'customerAppointDet',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/customerappointdetail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ customerAppointDet }) => customerAppointDet);
      const { data } = yield callWithLoading(services.customerappointdet.getAppointDet, { id });
      yield update({ details: data });
    },
  },

  reducers: {
  }
});
