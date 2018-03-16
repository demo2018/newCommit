import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'myWallet',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/mywallet': ({ params }) => {
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
      const { id } = yield select(({ doctorInfo }) => doctorInfo);
      const { data } = yield callWithLoading(services.mywallet.getWallet, { id });
      yield update({ details: data });
    },
  },

  reducers: {
  }
});
