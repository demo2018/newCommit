
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import RecordListDet from 'components/Doctor/RecordListDet';

function mapStateToProps({ layout }) {
  return {
    ...layout,
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
