
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import DoctorInfo from 'components/Doctor/DoctorInfo';

function mapStateToProps({ doctorInfo }) {
  return {
    ...doctorInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toDoctorName() {
      dispatch(routerRedux.push('/doctor/name'));
    },
    changeInfo(param) {
      dispatch({ type: 'doctorInfo/changeInfo', payload: { param } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
