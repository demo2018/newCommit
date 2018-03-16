import Model from 'utils/model';
import services from 'services';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'feedback',

  state: {
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        'common/feedback': () => {
          dispatch({ type: 'resetState' });
        },
      });
    }
  },

  effects: {
    * feedbackSubmit({ param }, { call, put }) {
      const result = yield call(services.feedback.getFeedback, { content: param });
      const status = result.status;
      if (status) {
        yield put(routerRedux.push('/common/feedbackresult'));
      } else {
        Toast.info('提交失败，请稍后再试', 1);
      }
    },
  },

  reducers: {
  }
});

