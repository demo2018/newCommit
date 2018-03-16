import Model from 'utils/model';
import services from 'services';
import { Toast } from 'antd-mobile';

export default Model.extend({
  namespace: 'billDet',

  state: {
    details: {},
    discount: {},
    billDetails: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/billdetail': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetails' });
          dispatch({ type: 'fetchDiscount' });
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
    * fetchDiscount({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.billdet.getDiscount);
      yield update({ discount: data });
    },
    * sendBillOut({ param }, { select, callWithLoading }) {
      const { id } = yield select(({ checkProject }) => checkProject);
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
