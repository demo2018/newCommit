
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import AppointResult from 'components/Common/AppointResult';

function mapStateToProps({ appointResult }) {
  return {
    ...appointResult,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toDoctorList() {
      dispatch(routerRedux.push('/common/doctors/list'));
    },
    toMyAppoint() {
      dispatch(routerRedux.push('/user/myappoint'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointResult);
