
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import UserCenter from 'components/Customer/UserCenter';

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
      dispatch(routerRedux.push('/user/myrecord'));
    },
    toMyImage() {
      dispatch(routerRedux.push('/user/myimage'));
    },
    toMyCoupons() {
      dispatch(routerRedux.push('/user/mycoupons'));
    },
    toFeedback() {
      dispatch(routerRedux.push('/common/feedback'));
    },
    toSet() {
      dispatch(routerRedux.push('/user/set'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter);
