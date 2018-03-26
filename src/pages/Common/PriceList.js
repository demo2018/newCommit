
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import PriceList from 'components/Common/PriceList';

function mapStateToProps({ priceList }) {
  return {
    ...priceList,
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
    getProjects(id) {
      dispatch({ type: 'priceList/getProjects', payload: { id } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);
