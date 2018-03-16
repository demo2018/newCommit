
import { connect } from 'dva';

import BillDet from 'components/Doctor/BillDet';

function mapStateToProps({ billDet, customerAppointDet }) {
  return {
    ...billDet,
    ...customerAppointDet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendBillOut(param) {
      dispatch({ type: 'billDet/sendBillOut', param });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BillDet);
