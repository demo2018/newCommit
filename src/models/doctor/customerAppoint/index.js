import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'customerAppoint',

  state: {
    ready: {},
    done: {},
    cancel: {},
    keywords: {},
    projects: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/customerappoint': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchReadyLists' });
          dispatch({ type: 'fetchDoneLists' });
          dispatch({ type: 'fetchCancelLists' });
          dispatch({ type: 'fetchProject' });
        },
      });
    }
  },

  effects: {
    * fetchReadyLists({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.customerappoint.getAppoint, { status: 1 });
      yield update({ ready: data });
    },
    * fetchDoneLists({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.customerappoint.getDoneAppoint);
      yield update({ done: data });
    },
    * fetchCancelLists({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.customerappoint.getCancelAppoint, { status: 4 });
      yield update({ cancel: data });
    },
    * fetchSearchList({ param }, { update, callWithLoading }) {
      const ready = yield callWithLoading(services.customerappoint.getAppoint, { status: 1, keywords: param });
      yield update({ ready: ready.data });
      const done = yield callWithLoading(services.customerappoint.getDoneAppoint, { keywords: param });
      yield update({ done: done.data });
      const cancel = yield callWithLoading(services.customerappoint.getCancelAppoint, { status: 4, keywords: param });
      yield update({ cancel: cancel.data });
    },
    // 项目
    * fetchProject({ payload }, { select, update, callWithLoading }) {
      const { types } = yield select(({ customerAppoint }) => customerAppoint);
      const { data: { content } } = yield callWithLoading(services.customerappoint.getProject, { types });
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
