
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import PriceListDet from 'components/Common/PriceListDet';

function mapStateToProps({ layout }) {
  return {
    ...layout,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceListDet);
