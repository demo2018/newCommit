
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import DoctorCenter from 'components/Doctor/DoctorCenter';

function mapStateToProps({ doctorCenter }) {
  return {
    ...doctorCenter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toCertification() {
      dispatch(routerRedux.push('/doctor/basic'));
    },
    toDoctorInfo() {
      dispatch(routerRedux.push('/doctor/info'));
    },
    toAuthenticationFailed() {
      dispatch(routerRedux.push('/doctor/authenticationfailed'));
    },
    toCustomerAppoint() {
      dispatch(routerRedux.push('/doctor/customerappoint'));
    },
    toTurnCenter() {
      dispatch(routerRedux.push('/doctor/turncenter'));
    },
    toCustomerBill() {
      dispatch(routerRedux.push('/doctor/customerbill'));
    },
    toRecordList() {
      dispatch(routerRedux.push('/doctor/recordlist'));
    },
    toDoctorCard() {
      dispatch(routerRedux.push('/doctor/mycard'));
    },
    toMyWallet() {
      dispatch(routerRedux.push('/doctor/mywallet'));
    },
    toNotice() {
      dispatch(routerRedux.push('/doctor/mynotice'));
    },
    toFeedback() {
      dispatch(routerRedux.push('/common/feedback'));
    },
    toDoctorSet() {
      dispatch(routerRedux.push('/doctor/doctorset'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCenter);
