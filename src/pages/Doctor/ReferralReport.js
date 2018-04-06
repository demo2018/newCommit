
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import ReferralReport from 'components/Doctor/ReferralReport';

function mapStateToProps({ referralReport }) {
  return {
    ...referralReport,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferralReport);
