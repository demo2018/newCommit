import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'authenticationFailed',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/authenticationfailed': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState' });
          dispatch({ type: 'fetchDetails' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctorcenter.getInfo);
      console.log(data);
      yield update({ details: data });
    },
  },

  reducers: {
  }
});
