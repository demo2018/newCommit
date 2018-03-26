import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'customerBill',

  state: {
    details: {},
    keywords: {},
    projects: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/customerbill': ({ params }) => {
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
    * fetchDetails({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.customerbill.getBill);
      yield update({ details: data });
    },
    * fetchSearchList({ param }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.customerbill.getDoneAppoint, { keywords: param });
      yield update({ details: data });
    },
    // 项目
    * fetchProject({ payload }, { select, update, callWithLoading }) {
      const { types } = yield select(({ customerBill }) => customerBill);
      const { data: { content } } = yield callWithLoading(services.customerbill.getProject, { types });
      yield update({ projects: content });
    },
  },

  reducers: {
    updateSearch(state, { payload: { keywords } }) {
      return {
        ...state,
        keywords: { ...state.keywords, ...keywords }
      };
    },
  }
});
