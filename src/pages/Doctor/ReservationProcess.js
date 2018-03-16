
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import ReservationProcess from 'components/Doctor/ReservationProcess';

function mapStateToProps({ userCenter }) {
  return {
    ...userCenter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toUserInfo() {
      dispatch(routerRedux.push('/user/userinfo'));
    },
    toMyAppoint() {
      dispatch(routerRedux.push('/user/myappoint'));
    },
    toMyBill() {
      dispatch(routerRedux.push('/user/mybill'));
    },
    toMyRec() {
      dispatch(routerRedux.push('/user/myrec'));
    },
    toMyImage() {
      dispatch(routerRedux.push('/user/myimage'));
    },
    toMyCoupons() {
      dispatch(routerRedux.push('/user/mycoupons'));
    },
    toFeedback() {
      dispatch(routerRedux.push('/user/feedback'));
    },
    toSet() {
      dispatch(routerRedux.push('/user/set'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationProcess);
