
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import cookie from 'js-cookie';

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
      if (localStorage.getItem('referral') == 1) {
        dispatch({ type: 'doctorList/getReferral' });
      }
      dispatch(routerRedux.push('/common/contactservice'));
    },
    getProjects(id) {
      dispatch({ type: 'priceList/getProjects', payload: { id } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);
