
import { connect } from 'dva';

import CancelReason from 'components/Customer/CancelReason';

function mapStateToProps({ cancelReason }) {
  return {
    ...cancelReason,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateAppoint(param) {
      dispatch({ type: 'cancelReason/updateAppoint', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelReason);
