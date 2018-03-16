import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'customerBillDet',

  state: {
    details: {},
    goods: [],
    bads: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/customerbilldetail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'fetchGood' });
          dispatch({ type: 'fetchBad' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ customerBillDet }) => customerBillDet);
      const { data } = yield callWithLoading(services.customerbilldet.getBill, { id });
      yield update({ details: data });
    },
    * fetchGood({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.customerbilldet.getGood);
      yield update({ goods: content });
    },
    * fetchBad({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.customerbilldet.getBad);
      yield update({ bads: content });
    },
  },

  reducers: {
  }
});
