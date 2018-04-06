
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import TurnCenter from 'components/Doctor/TurnCenter';

function mapStateToProps({ turnCenter }) {
  return {
    ...turnCenter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toDet(id) {
      dispatch(routerRedux.push(`/doctor/reservationprocess/${id}`));
    },
    toReport() {
      dispatch(routerRedux.push('/doctor/referralreport'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TurnCenter);
