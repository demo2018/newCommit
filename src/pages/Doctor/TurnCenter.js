
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import TurnCenter from 'components/Doctor/TurnCenter';

function mapStateToProps({ userCenter }) {
  return {
    ...userCenter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toDet(id) {
      dispatch(routerRedux.push(`/doctor/reservationprocess/${id}`));
    },
    toSuccess(id) {
      dispatch(routerRedux.push(`/doctor/referralcomplete/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TurnCenter);
