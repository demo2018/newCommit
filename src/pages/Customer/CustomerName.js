
import { connect } from 'dva';

import CustomerName from 'components/Customer/CustomerName';

function mapStateToProps({ userInfo }) {
  return {
    ...userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeInfo(param) {
      dispatch({ type: 'userInfo/updateName', payload: { param } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerName);
