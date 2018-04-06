import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'reservationProcess',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/reservationprocess/:id': ({ params }) => {
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
      const { id } = yield select(({ reservationProcess }) => reservationProcess);
      const { data } = yield callWithLoading(services.reservationprocess.referralProcess, { id });
      yield update({ details: data });
    },
  },

  reducers: {
  }
});
