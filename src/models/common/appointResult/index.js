import Model from 'utils/model';

export default Model.extend({
  namespace: 'appointResult',

  state: {
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/common/doctors/appointresult': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState' });
        },
      });
    }
  },

  effects: {
  },

  reducers: {

  }
});
