
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import DoctorProfessional from 'components/Doctor/DoctorProfessional';

function mapStateToProps({ doctorProfessional }) {
  return {
    ...doctorProfessional,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toSeniority() {
      dispatch(routerRedux.push('/doctor/seniority'));
    },
    changeInfo(param) {
      dispatch({ type: 'doctorProfessional/changeInfo', payload: { param } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfessional);
