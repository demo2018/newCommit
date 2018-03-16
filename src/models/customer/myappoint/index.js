import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'myAppoint',

  state: {
    id: '',
    listNew: [],
    listConfirm: [],
    listCancel: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/user/myappoint': () => {
          dispatch({ type: 'resetState' });
          const arr = [0, 1, 4];
          arr.forEach((id) => {
            dispatch({ type: 'updateState', payload: { id } });
            dispatch({ type: 'fetchDetails' });
          });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ myAppoint }) => myAppoint);
      const { data = {} } = yield callWithLoading(services.myappoint.getNewAppoint, id);
      if (id == 0) {
        yield update({ listNew: data.content });
      } else if (id == 1) {
        yield update({ listConfirm: data.content });
      } else if (id == 4) {
        yield update({ listCancel: data.content });
      }
    },
  },

  reducers: {

  }
});
