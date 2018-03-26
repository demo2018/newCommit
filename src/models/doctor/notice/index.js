import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'notice',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/notice': ({ params }) => {
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
      const { data } = yield callWithLoading(services.notice.getNotice);
      yield update({ details: data });
    },
    * setNotice({ payload: { id, param } }, { callWithLoading }) {
      yield callWithLoading(services.notice.setNotice, { id, param });
    },
  },

  reducers: {
  }
});
