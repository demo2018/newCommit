import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'checkProject',

  state: {
    tabs: [],
    projects: [],
    selectedProjects: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/checkproject': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'getTabs' });
        },
      });
    }
  },

  effects: {
    * getTabs({ payload }, { put, update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.checkproject.getTabs);
      yield update({ tabs: content });
      if (content && content.length) {
        yield put({ type: 'getProjects', payload: { id: content[0].id } });
      }
    },
    * getProjects({ payload: { id } }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.checkproject.getProjects, { id });
      yield update({ projects: content });
    },
  },

  reducers: {
  }
});
