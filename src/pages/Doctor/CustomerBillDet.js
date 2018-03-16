
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import CustomerBillDet from 'components/Doctor/CustomerBillDet';

function mapStateToProps({ customerBillDet }) {
  return {
    ...customerBillDet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toGenerateBill() {
      dispatch(routerRedux.push('/doctor/billprice'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerBillDet);
