import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'myBill',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/user/mybill': ({ params }) => {
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
      const { id } = yield select(({ myBill }) => myBill);
      const { data } = yield callWithLoading(services.mybill.getBill, { id });
      yield update({ details: data });
    },
  },

  reducers: {

  }
});
