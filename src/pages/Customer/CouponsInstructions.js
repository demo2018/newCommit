

import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import CouponsInstructions from 'components/Customer/CouponsInstructions';

function mapStateToProps({ couponsInstructions }) {
  return {
    ...couponsInstructions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toMyBillDet(id) {
      dispatch(routerRedux.push(`/user/myimagedetail/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CouponsInstructions);
