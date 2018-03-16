
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MyWallet from 'components/Doctor/MyWallet';

function mapStateToProps({ myWallet }) {
  return {
    ...myWallet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toWallet() {
      dispatch(routerRedux.push('/doctor/mywalletdetail'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyWallet);
