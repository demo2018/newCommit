
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MyWalletDet from 'components/Doctor/MyWalletDet';

function mapStateToProps({ myWalletDet }) {
  return {
    ...myWalletDet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletDet);
