
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MyBill from 'components/Customer/MyBill';

function mapStateToProps({ myBill }) {
  return {
    ...myBill,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toBillDetail(id) {
      dispatch(routerRedux.push(`/user/mybilldetail/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBill);
