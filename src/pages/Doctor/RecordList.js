
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import RecordList from 'components/Doctor/RecordList';

function mapStateToProps({ layout }) {
  return {
    ...layout,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toRecordListDet(id) {
      dispatch(routerRedux.push(`/doctor/recordlistdetail/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
