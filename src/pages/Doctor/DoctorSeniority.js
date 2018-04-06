
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import DoctorSeniority from 'components/Doctor/DoctorSeniority';

function mapStateToProps({ doctorSeniority }) {
  return {
    ...doctorSeniority,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toResult() {
      dispatch(routerRedux.push('/doctor/certificationresult'));
    },
    submitCheck(param) {
      dispatch({ type: 'doctorSeniority/submitCheck', param });
    },
    imgUpload(param) {
      dispatch({ type: 'doctorSeniority/imgUpload', payload: { param } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSeniority);
