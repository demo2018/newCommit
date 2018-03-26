
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import CustomerBill from 'components/Doctor/CustomerBill';

function mapStateToProps({ customerBill }) {
  return {
    ...customerBill,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toBillDetail(id) {
      dispatch(routerRedux.push(`/doctor/customerbilldetail/${id}`));
    },
    fetchSearchList(param) {
      // dispatch({ type: 'customerAppoint/updateSearch', payload: { keywords } });
      dispatch({ type: 'customerBill/fetchSearchList', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerBill);
