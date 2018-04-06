import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'myRecDet',

  state: {
    details: {},
    goods: [],
    bads: [],
    projects: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/user/myrecorddetail/:id': ({ params }) => {
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
      // const { id } = yield select(({ myRecDet }) => myRecDet);
      const { data } = yield callWithLoading(services.myrecdet.getRecDetails);
      yield update({ details: data });
    }
  },

  reducers: {

  }
});
