import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'myBill',

  state: {
    details: {},
    projects: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/user/mybill': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'fetchProject' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ myBill }) => myBill);
      const { data } = yield callWithLoading(services.mybill.getBill, { id });
      yield update({ details: data });
    },
    // 项目
    * fetchProject({ payload }, { select, update, callWithLoading }) {
      const { types } = yield select(({ myBill }) => myBill);
      const { data: { content } } = yield callWithLoading(services.mybill.getProject, { types });
      yield update({ projects: content });
    },
  },

  reducers: {

  }
});
