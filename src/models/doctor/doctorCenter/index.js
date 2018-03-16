import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'doctorCenter',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/center': ({ params }) => {
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
      const { data } = yield callWithLoading(services.doctorcenter.getInfo);
      yield update({ details: data });
    },
  },

  reducers: {
  }
});
