
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import CustomerAppointDet from 'components/Doctor/CustomerAppointDet';

function mapStateToProps({ customerAppointDet }) {
  return {
    ...customerAppointDet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toGenerateBill() {
      dispatch(routerRedux.push('/doctor/checkproject'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAppointDet);
