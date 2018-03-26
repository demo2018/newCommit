import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'priceListDet',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/common/pricelistdetail/:id': ({ params }) => {
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
      const { id } = yield select(({ priceListDet }) => priceListDet);
      const { data } = yield callWithLoading(services.pricelistdet.getDetails, { id });
      yield update({ details: data });
    },
  },

  reducers: {
  }
});
