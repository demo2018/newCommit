
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import Login from 'components/Common/Login';

function mapStateToProps({ login }) {
  return {
    ...login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    customerLoginCode(param) {
      dispatch({ type: 'login/customerLoginCode', param });
    },
    customerLogin(param) {
      dispatch({ type: 'login/customerLogin', param });
    },
    doctorLoginCode(param) {
      dispatch({ type: 'login/doctorLoginCode', param });
    },
    doctorLogin(param) {
      dispatch({ type: 'login/doctorLogin', param });
    },
    toProtectPrivacy() {
      dispatch(routerRedux.push('/common/protectprivacy'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
