
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
    toAppoint() {
      dispatch(routerRedux.push('/common/doctors/list'));
    },
    toRecordListDet(id) {
      dispatch(routerRedux.push(`/common/doctors/detail/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCard);
