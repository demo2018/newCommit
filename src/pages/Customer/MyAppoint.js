
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MyAppoint from 'components/Customer/MyAppoint';

function mapStateToProps({ myAppoint }) {
  return {
    ...myAppoint,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toCancel(id) {
      dispatch(routerRedux.push(`/user/cancelreason/${id}`));
    },
    toAppoint() {
      dispatch(routerRedux.push('/common/doctors/list'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAppoint);
