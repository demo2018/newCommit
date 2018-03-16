
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MyCoupons from 'components/Customer/MyCoupons';

function mapStateToProps({ myCoupons }) {
  return {
    ...myCoupons,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toCouponsInstruction() {
      dispatch(routerRedux.push('/user/couponsinstructions'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCoupons);
