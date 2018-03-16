import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'customerBill',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/customerbill': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.customerbill.getBill);
      yield update({ details: data });
    },
  },

  reducers: {
  }
});
