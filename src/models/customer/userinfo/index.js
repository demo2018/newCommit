import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';
import cookie from 'js-cookie';


export default Model.extend({
  namespace: 'userInfo',

  state: {
    datas: [], // 关系详情
    details: {}, // 个人信息详情
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/user/userinfo': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchRelations' });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'weChat' });
        },
      });
    }
  },

  effects: {
    * fetchRelations({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ userInfo }) => userInfo);
      const { data } = yield callWithLoading(services.userinfo.getList, { id });
      yield update({ datas: data });
    },
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ userInfo }) => userInfo);
      const { data } = yield callWithLoading(services.userinfo.getInfo, { id });
      yield update({ details: data });
    },

    //  更改个人信息
    * changeInfo({ payload: { param } }, { put, callWithLoading }) {
      const { data } = yield callWithLoading(services.userinfo.editInfo, param);
      yield put({ details: data });
    },

    //  图片上传
    * imgUpload({ payload: { param } }, { put, callWithLoading }) {
      const res = yield callWithLoading(services.userinfo.imgUpload, param);
      if (res.status) {
        yield callWithLoading(services.userinfo.editInfo, { icon: res.data });
        yield put({ type: 'fetchDetails' }); // 更新信息，保持和服务端一致
      }
    },
    // 修改名字
    * updateName({ payload: { param } }, { put, callWithLoading }) {
      yield callWithLoading(services.userinfo.editInfo, param);
      cookie.set('realName', param.realName);
      if (localStorage.getItem('toAdd')) {
        yield put(routerRedux.push(`/common/doctors/appoint/${localStorage.getItem('toAdd')}`));
        localStorage.removeItem('toAdd');
      } else {
        yield put(routerRedux.push('/user/userinfo'));
      }
    },
    //  获取微信配置
    * weChat({ param }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.userinfo.getWechat, { url: location.href.split('#')[0] });
      yield update({ wechat: data });
    },
  },

  reducers: {
  }
});
