
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import RecordList from 'components/Doctor/RecordList';

function mapStateToProps({ recordList }) {
  return {
    ...recordList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSearchList(search) {
      dispatch({ type: 'recordList/updateSearch', payload: { search } });
      dispatch({ type: 'recordList/fetchSearchList' });
    },
    toRecordListDet(id) {
      dispatch(routerRedux.push(`/doctor/recordlistdetail/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
