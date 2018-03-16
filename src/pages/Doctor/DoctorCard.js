
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import DoctorCard from 'components/Doctor/DoctorCard';

function mapStateToProps({ userCenter }) {
  return {
    ...userCenter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toProfessional() {
      dispatch(routerRedux.push('/doctor/professional'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCard);
