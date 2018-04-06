import Model from 'utils/model';
import services from 'services';
import { Toast } from 'antd-mobile';

export default Model.extend({
  namespace: 'evaluate',

  state: {
    id: '',
    goods: [],
    bads: [],
    details: {},
    wechat: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/user/evaluate': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState' });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'fetchGood' });
          dispatch({ type: 'fetchBad' });
          dispatch({ type: 'weChat' });
        },
      });
    }
  },

  effects: {
    * fetchGood({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.evaluate.getGood);
      yield update({ goods: content });
    },
    * fetchBad({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.evaluate.getBad);
      yield update({ bads: content });
    },
    * addEvaluate({ payload: { param } }, { select, callWithLoading }) {
      const { id } = yield select(({ myBillDet }) => myBillDet);
      const result = yield callWithLoading(services.evaluate.evaluate, { billId: id, ...param, });
      const status = result.status;
      if (status) {
        Toast.info('评价成功');
      }
    },

    //  获取配置
    * weChat({ param }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.evaluate.getWechat);
      yield update({ wechat: data });
    },
  },

  reducers: {

  }
});
