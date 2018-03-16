import Model from 'utils/model';
import services from 'services';
import cookie from 'js-cookie';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'doctorAppoint',

  state: {
    id: '',
    doctorInfo: {},
    times: {},
    projects: {},
    relations: [], // 初始化为对象
    addAppoint: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/common/doctors/appoint/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'fetchTime' });
          dispatch({ type: 'fetchProject' });
          dispatch({ type: 'fetchRelation' });
        },
      });
    }
  },

  effects: {
    // 医生详情
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorAppoint }) => doctorAppoint);
      const { data } = yield callWithLoading(services.doctordetail.getDetail, { id });
      yield update({ doctorInfo: data });
    },
    // 就诊时间
    * fetchTime({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorAppoint }) => doctorAppoint);
      const { data } = yield callWithLoading(services.doctorappoint.appointTime, { id });
      yield update({ times: data });
    },
    // 可预约项目
    * fetchProject({ payload }, { select, update, callWithLoading }) {
      const { types } = yield select(({ doctorAppoint }) => doctorAppoint);
      const { data } = yield callWithLoading(services.doctorappoint.getProject, { types });
      yield update({ projects: data });
    },
    // 可选就诊人
    * fetchRelation({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorAppoint }) => doctorAppoint);
      const { data } = yield callWithLoading(services.doctorappoint.onRelation, { id });
      yield update({ relations: data });
    },
    //  新增预约
    * addAppoint({ payload: { param } }, { select, put, callWithLoading }) {
      const { id } = yield select(({ doctorAppoint }) => doctorAppoint);
      const customerId = cookie.get('id');
      const result = yield callWithLoading(services.doctorappoint.addAppoint, { ...param, doctorId: id, customerId });
      if (result.status) {
        yield put(routerRedux.push('/user/myappoint'));
      }
    },
  },

  reducers: {

  }
});
