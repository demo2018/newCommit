
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import DoctorDetail from 'components/Common/DoctorDetail';

function mapStateToProps({ doctorDetail }) {
  return {
    ...doctorDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toDoctorAppoint(id) {
      dispatch(routerRedux.push(`/common/doctors/appoint/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
