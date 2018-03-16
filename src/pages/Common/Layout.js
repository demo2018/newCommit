
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import Layout from 'components/Common/Layout';

function mapStateToProps({ layout }) {
  return {
    ...layout,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin() {
      dispatch(routerRedux.push('/doctors/list'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
