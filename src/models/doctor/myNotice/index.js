import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'myNotice',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/mynotice': ({ params }) => {
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
      const { id } = yield select(({ myNotice }) => myNotice);
      const { data } = yield callWithLoading(services.mynotice.getNoticeList, { id });
      yield update({ details: data });
    },
  },

  reducers: {
  }
});
