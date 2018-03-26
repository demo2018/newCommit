
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import PriceListDet from 'components/Common/PriceListDet';

function mapStateToProps({ priceListDet }) {
  return {
    ...priceListDet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toContactService() {
      dispatch(routerRedux.push('/common/contactservice'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceListDet);
