import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'doctorList',

  state: {
    search: {
      doctorName: '',
      doctorId: [],
      projectId: [],
      dateIds: [],
    },
    details: [],
    banners: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/common/doctors/list': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'fetchBanners' });
          dispatch({ type: 'fetchDetails' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctorlist.getList);
      yield update({ details: data });
    },
    * fetchBanners({ payload }, { select, update, callWithLoading }) {
      const { states } = yield select(({ doctorList }) => doctorList);
      const { data } = yield callWithLoading(services.doctorlist.gerBanner, { states });
      yield update({ banners: data });
    },
    * fetchSearchList({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ doctorList }) => doctorList);
      const { data } = yield callWithLoading(services.doctorlist.getList, search);
      yield update({ details: data });
    },
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

