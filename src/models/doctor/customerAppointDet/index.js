import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'customerAppointDet',

  state: {
    details: {},
    projects: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/customerappointdetail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'fetchProject' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ customerAppointDet }) => customerAppointDet);
      const { data } = yield callWithLoading(services.customerappointdet.getAppointDet, { id });
      yield update({ details: data });
    },
    // 项目
    * fetchProject({ payload }, { select, update, callWithLoading }) {
      const { types } = yield select(({ customerAppointDet }) => customerAppointDet);
      const { data } = yield callWithLoading(services.customerappointdet.getProject, { types });
      yield update({ projects: data });
    },
  },

  reducers: {
  }
});
