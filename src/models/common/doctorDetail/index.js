import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'doctorDetail',

  state: {
    details: {},
    dateTime: {},
    tags: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/common/doctors/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'fetchTags' });
          dispatch({ type: 'fetchSchedule' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorDetail }) => doctorDetail);
      const { data } = yield callWithLoading(services.doctordetail.getDetail, { id });
      yield update({ details: data });
    },
      //  擅长标签
    * fetchTags({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctordetail.getTags);
      yield update({ tags: data });
    },
    // 获取出诊时间
    * fetchSchedule({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorDetail }) => doctorDetail);
      const { data } = yield callWithLoading(services.doctordetail.getDoctorTime, { id });
      yield update({ dateTime: data });
    },
  },

  reducers: {

  }
});
