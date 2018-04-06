import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'doctorSeniority',

  state: {
    details: {},
    wechat: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/seniority': ({ params }) => {
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
    * submitCheck({ param }, { put, callWithLoading }) {
      const result = yield callWithLoading(services.doctorinfo.editInfo, param);
      if (result.status) {
        yield put(routerRedux.push('/doctor/center'));
      }
    },
    //  图片上传
    * imgUpload({ payload: { param } }, { put, callWithLoading }) {
      // 获取要更新的图片参数，将ID赋给相应参数
      const { key } = param.key;
      alert(key);
      alert(param.mediaId);
      const res = yield callWithLoading(services.doctorinfo.imgUpload, param.mediaId);
      if (res.status) {
        yield callWithLoading(services.doctorinfo.editInfo, { [key]: res.data });
        yield put({ type: 'fetchDetails' }); // 更新信息，保持和服务端一致
      }
    },
    //  获取微信配置
    * weChat({ param }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctorinfo.getWechat, { url: location.href.split('#')[0] });
      yield update({ wechat: data });
    },
  },

  reducers: {
  }
});
