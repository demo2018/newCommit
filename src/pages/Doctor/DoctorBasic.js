
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import DoctorBasic from 'components/Doctor/DoctorBasic';

function mapStateToProps({ doctorBasic }) {
  return {
    ...doctorBasic,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toProfessional() {
      dispatch(routerRedux.push('/doctor/professional'));
    },
    changeInfo(param) {
      dispatch({ type: 'doctorBasic/changeInfo', payload: { param } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorBasic);
