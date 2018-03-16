
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import FeedbackResult from 'components/Common/FeedbackResult';

function mapStateToProps({ layout }) {
  return {
    ...layout,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toDoctorList() {
      dispatch(routerRedux.push('/doctors/list'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackResult);
