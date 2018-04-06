import Model from 'utils/model';
import services from 'services';
import cookie from 'js-cookie';

export default Model.extend({
  namespace: 'doctorList',

  state: {
    search: {
      name: '',
      dayOfWeek: [],
      itemName: '',
    },
    choose: {},
    details: [],
    banners: [],
    servicesItem: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/common/doctors/list': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'fetchBanners' });
          dispatch({ type: 'fetchSearchList' });
          dispatch({ type: 'fetchServiceItems' });
        },
      });
    }
  },

  effects: {
    //  获取banner
    * fetchBanners({ payload }, { select, update, callWithLoading }) {
      const { states } = yield select(({ doctorList }) => doctorList);
      const { data } = yield callWithLoading(services.doctorlist.gerBanner, { states });
      yield update({ banners: data });
    },
    // 下拉框渲染搜索项目
    * fetchServiceItems({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctorlist.getServiceItems);
      yield update({ servicesItem: data });
    },
    //  搜索框及下拉项目及出诊时间筛选
    * fetchSearchList({ param }, { select, update, callWithLoading }) {
      const { search } = yield select(({ doctorList }) => doctorList);
      const { data } = yield callWithLoading(services.doctorlist.gerDoctorList, search);
      yield update({ details: data });
    },
    // 获取转诊咨询情况
    * getReferral({ payload }, { callWithLoading }) {
      yield callWithLoading(services.doctorlist.getReferral, { id: parseInt(`${cookie.get('id')}`) });
    },
  },

  reducers: {
    updateSearch(state, { payload: { search } }) {
      return {
        ...state,
        search: { ...state.search, ...search }
      };
    },
  }
});

