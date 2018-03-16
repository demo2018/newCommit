
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import CertificationResult from 'components/Doctor/CertificationResult';

function mapStateToProps({ userCenter }) {
  return {
    ...userCenter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toGenerateBill() {
      dispatch(routerRedux.push('/doctor/billprice'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CertificationResult);
