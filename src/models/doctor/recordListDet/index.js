import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'recordListDet',

  state: {
    details: {},
    goods: [],
    bads: [],
    projects: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/recordlistdetail/:id': ({ params }) => {
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
      // const { id } = yield select(({ recordListDet }) => recordListDet);
      const { data } = yield callWithLoading(services.recordlistdet.getRecDetails);
      yield update({ details: data });
    }
  },

  reducers: {

  }
});
