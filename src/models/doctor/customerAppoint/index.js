import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'customerAppoint',

  state: {
    ready: {},
    done: {},
    cancel: {},
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
        },
      });
    }
  },

  effects: {
    * fetchReadyLists({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.customerappoint.getAppoint);
      yield update({ ready: data });
    },
    * fetchDoneLists({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.customerappoint.getDoneAppoint);
      yield update({ done: data });
    },
    * fetchCancelLists({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.customerappoint.getCancelAppoint);
      yield update({ cancel: data });
    },
  },

  reducers: {
  }
});
