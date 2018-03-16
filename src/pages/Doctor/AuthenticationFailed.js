
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import AuthenticationFailed from 'components/Doctor/AuthenticationFailed';

function mapStateToProps({ authenticationFailed }) {
  return {
    ...authenticationFailed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toCertification() {
      dispatch(routerRedux.push('/doctor/basic'));
    },
    toContactService() {
      dispatch(routerRedux.push('/common/contactservice'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationFailed);
