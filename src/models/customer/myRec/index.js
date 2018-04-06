import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'myRec',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/user/myrecord': ({ params }) => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState' });
          dispatch({ type: 'fetchDetails' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.myrec.getRecList);
      yield update({ details: data });
    }
  },

  reducers: {

  }
});
