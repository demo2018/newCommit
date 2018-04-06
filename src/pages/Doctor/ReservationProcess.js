
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import ReservationProcess from 'components/Doctor/ReservationProcess';

function mapStateToProps({ reservationProcess }) {
  return {
    ...reservationProcess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationProcess);
