import Model from 'utils/model';
import services from 'services';
import cookie from 'js-cookie';

export default Model.extend({
  namespace: 'priceList',

  state: {
    tabs: [],
    projects: [],
    selectedProjects: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/common/pricelist': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'getTabs' });
        },
      });
    }
  },

  effects: {
    * getTabs({ payload }, { put, update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.pricelist.getTabs);
      yield update({ tabs: content });
      if (content && content.length) {
        yield put({ type: 'getProjects', payload: { id: content[0].id } });
      }
    },
    * getProjects({ payload: { id } }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.pricelist.getProjects, { id });
      yield update({ projects: content });
    },
    // 获取转诊咨询情况
    * getReferral({ payload }, { callWithLoading }) {
      yield callWithLoading(services.doctorlist.getReferral, { id: parseInt(`${cookie.get('id')}`) });
    },
  },

  reducers: {
  }
});
