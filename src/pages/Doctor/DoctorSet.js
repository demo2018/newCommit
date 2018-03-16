
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import DoctorSet from 'components/Doctor/DoctorSet';

function mapStateToProps({ doctorSet }) {
  return {
    ...doctorSet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toChangePhone() {
      dispatch(routerRedux.push('/common/changephone'));
    },
    toNotice() {
      dispatch(routerRedux.push('/doctor/notice'));
    },
    login(param) {
      dispatch({ type: 'doctorSet/logout', param });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSet);
