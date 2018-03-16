
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import PriceList from 'components/Common/PriceList';

function mapStateToProps({ layout }) {
  return {
    ...layout,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toPriceDetail(id) {
      dispatch(routerRedux.push(`/common/pricelistdetail/${id}`));
    },
    toContactService() {
      dispatch(routerRedux.push('/common/contactservice'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);
