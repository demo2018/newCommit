import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'myWalletDet',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/mywalletdetail': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState' });
          dispatch({ type: 'fetchDetails' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ customerBillDet }) => customerBillDet);
      const { data } = yield callWithLoading(services.mywalletdet.getWallet, { id });
      yield update({ details: data });
    },
    * chooseMonth({ payload: { month } }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.mywalletdet.getMonthList, { month });
      yield update({ details: data });
    },
  },

  reducers: {
  }
});
