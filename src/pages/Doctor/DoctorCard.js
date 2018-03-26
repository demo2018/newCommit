
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import DoctorCard from 'components/Doctor/DoctorCard';

function mapStateToProps({ doctorCard }) {
  return {
    ...doctorCard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCard);
