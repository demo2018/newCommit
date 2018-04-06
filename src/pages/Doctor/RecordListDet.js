
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import RecordListDet from 'components/Doctor/RecordListDet';

function mapStateToProps({ recordListDet }) {
  return {
    ...recordListDet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toDoctorDetail(id) {
      dispatch(routerRedux.push(`/doctor/recordlistdetail/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordListDet);
