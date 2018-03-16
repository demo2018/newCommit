import Model from 'utils/model';
import services from 'services';


export default Model.extend({
  namespace: 'doctorBasic',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/basic': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'weChat' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorInfo }) => doctorInfo);
      const { data } = yield callWithLoading(services.doctorinfo.getInfo, { id });
      yield update({ details: data });
    },
    * changeInfo({ payload: { param } }, { callWithLoading }) {
      yield callWithLoading(services.doctorinfo.editInfo, param);
    },
    * wechat({ param }, { callWithLoading }) {
      const { data } = yield callWithLoading(services.doctorinfo.getWechat);
      console.log(data);
    },
  },

  reducers: {
  }
});
