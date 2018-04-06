import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'recordList',

  state: {
    details: {},
    search: {
      name: '',
      phone: '',
      type: 0,
      itemName: '',
    }
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/recordlist': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState' });
          dispatch({ type: 'fetchSearchList' });
        },
      });
    }
  },

  effects: {
    * fetchSearchList({ params }, { select, update, callWithLoading }) {
      const { search } = yield select(({ recordList }) => recordList);
      const { data } = yield callWithLoading(services.recordlist.getRecList, search);
      yield update({ details: data });
    }
  },

  reducers: {
    updateSearch(state, { payload: { search } }) {
      return {
        ...state,
        search: { ...state.search, ...search }
      };
    },
  }
});
