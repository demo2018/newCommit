
import { connect } from 'dva';

import DoctorName from 'components/Doctor/DoctorName';

function mapStateToProps({ doctorInfo }) {
  return {
    ...doctorInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeInfo(param) {
      dispatch({ type: 'doctorInfo/updateName', payload: { param } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorName);
