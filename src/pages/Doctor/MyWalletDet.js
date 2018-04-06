
import { connect } from 'dva';

import MyWalletDet from 'components/Doctor/MyWalletDet';

function mapStateToProps({ myWalletDet }) {
  return {
    ...myWalletDet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chooseMonth(param) {
      dispatch({ type: 'myWalletDet/chooseMonth', payload: { month: param } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletDet);
