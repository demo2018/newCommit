import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'myBillDet',

  state: {
    details: {},
    goods: [],
    bads: [],
    projects: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/user/mybilldetail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'fetchGood' });
          dispatch({ type: 'fetchBad' });
          dispatch({ type: 'fetchProject' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ myBillDet }) => myBillDet);
      const { data } = yield callWithLoading(services.mybilldet.getBillDet, { id });
      yield update({ details: data });
    },
    * fetchGood({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.mybilldet.getGood);
      yield update({ goods: content });
    },
    * fetchBad({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.mybilldet.getBad);
      yield update({ bads: content });
    },
    // 项目
    * fetchProject({ payload }, { select, update, callWithLoading }) {
      const { types } = yield select(({ myBillDet }) => myBillDet);
      const { data: { content } } = yield callWithLoading(services.mybilldet.getProject, { types });
      yield update({ projects: content });
    },
  },

  reducers: {

  }
});
