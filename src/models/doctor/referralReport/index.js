import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'referralReport',

  state: {
    referraling: {},
    referralSuccess: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/referralreport': () => {
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
      const { data } = yield callWithLoading(services.referralreport.referraling, [0, 1, 2, 3, 4, 5]);
      yield update({ referraling: data });
    },
    * fetchReferralSuccess({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.referralreport.referralSuccess, [6]);
      yield update({ referralSuccess: data });
    },
  },

  reducers: {
  }
});
