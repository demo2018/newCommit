import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'turnCenter',

  state: {
    referraling: {},
    referralSuccess: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/turncenter': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState' });
          // dispatch({ type: 'fetchReferraling' });
          // dispatch({ type: 'fetchReferralSuccess' });
        },
      });
    }
  },

  effects: {
    * fetchReferraling({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.turncenter.referraling, [0, 1, 2, 3, 4, 5]);
      yield update({ referraling: data });
    },
    * fetchReferralSuccess({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.turncenter.referralSuccess, [6]);
      yield update({ referralSuccess: data });
    },
  },

  reducers: {
  }
});
