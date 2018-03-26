
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import CustomerAppoint from 'components/Doctor/CustomerAppoint';

function mapStateToProps({ customerAppoint }) {
  return {
    ...customerAppoint,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toDet(id) {
      dispatch(routerRedux.push(`/doctor/customerappointdetail/${id}`));
    },
    toCompleteDet(id) {
      dispatch(routerRedux.push(`/doctor/customerbilldetail/${id}`));
    },
    fetchSearchList(param) {
      // dispatch({ type: 'customerAppoint/updateSearch', payload: { keywords } });
      dispatch({ type: 'customerAppoint/fetchSearchList', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAppoint);
