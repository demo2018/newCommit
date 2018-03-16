
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import AppointResult from 'components/Common/AppointResult';

function mapStateToProps({ layout, doctorAppoint }) {
  return {
    ...layout,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toDoctorList() {
      dispatch(routerRedux.push('/doctors/list'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointResult);
