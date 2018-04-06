import Model from 'utils/model';
import { routerRedux } from 'dva/router';
import services from 'services';

export default Model.extend({
  namespace: 'addRelation',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/user/addrelation': () => {
          dispatch({ type: 'resetState' });
        },
        '/user/updaterelation/:id/:relationId': ({ params }) => {
          const id = params[0];
          const relation = params[1];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id, relation } });
          dispatch({ type: 'fetchDetails' });
        },
      });
    }
  },

  effects: {
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ addRelation }) => addRelation);
      const { relation } = yield select(({ addRelation }) => addRelation);
      const { data } = yield callWithLoading(services.addrelation.getRelation, { id, relation });
      // console.log(data);
      yield update({ details: data, relationId: relation });
    },
    // 新增
    * addRelationinfo({ payload: { param } }, { put, update, callWithLoading }) {
      const { data } = yield callWithLoading(services.addrelation.addRelation, param);
      yield update({ details: data });
      if (localStorage.getItem('toAdd')) {
        yield put(routerRedux.push(`/common/doctors/appoint/${localStorage.getItem('toAdd')}`));
        localStorage.removeItem('toAdd');
      } else {
        yield put(routerRedux.push('/user/userinfo'));
      }
    },
    //  更新
    * upDateRelationinfo({ payload: { param } }, { put, select, update, callWithLoading }) {
      const { id } = yield select(({ addRelation }) => addRelation);
      const { relation } = yield select(({ addRelation }) => addRelation);
      const { data } = yield callWithLoading(services.addrelation.upDateRelation, { param, id, relation });
      yield update({ details: data });
      yield put(routerRedux.push('/user/userinfo'));
    },
  },

  reducers: {

  }
});
