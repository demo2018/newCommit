
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAppoint);
