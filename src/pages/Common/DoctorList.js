
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import DoctorList from 'components/Common/DoctorList';

function mapStateToProps({ doctorList }) {
  return {
    ...doctorList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toDoctorDetail(id) {
      dispatch(routerRedux.push(`/common/doctors/detail/${id}`));
    },
    fetchSearchList(search) {
      dispatch({ type: 'doctorList/updateSearch', payload: { search } });
      dispatch({ type: 'doctorList/fetchSearchList' });
    },
    fetchSelectList(choose) {
      dispatch({ type: 'doctorList/updateSelect', payload: { choose } });
      dispatch({ type: 'doctorList/fetchSelectList' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorList);
