
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MyBillDet from 'components/Customer/MyBillDet';

function mapStateToProps({ myBillDet }) {
  return {
    ...myBillDet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toEvaluate() {
      dispatch(routerRedux.push('/user/evaluate'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBillDet);
