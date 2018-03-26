import Model from 'utils/model';
import services from 'services';
import { Toast } from 'antd-mobile';

export default Model.extend({
  namespace: 'billDet',

  state: {
    discount: {},
    billDetails: {},
    projects: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/billdetail': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDiscount' });
          dispatch({ type: 'fetchProject' });
        },
      });
    }
  },

  effects: {
    //  获取折扣
    * fetchDiscount({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.billdet.getDiscount);
      yield update({ discount: data });
    },
    // 项目
    * fetchProject({ payload }, { select, update, callWithLoading }) {
      const { types } = yield select(({ billDet }) => billDet);
      const { data } = yield callWithLoading(services.billdet.getProject, { types });
      yield update({ projects: data });
    },
    * sendBillOut({ param }, { select, callWithLoading }) {
      const { id } = yield select(({ billDet }) => billDet);
      const result = yield callWithLoading(services.billdet.sendBill, { id, param });
      const status = result.status;
      if (status) {
        Toast.success('账单发送成功', 1);
      } else {
        Toast.info(result.error.message, 1);
      }
    },
  },

  reducers: {
  }
});
