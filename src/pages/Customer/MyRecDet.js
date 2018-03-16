
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MyRecDet from 'components/Customer/MyRecDet';

function mapStateToProps({ myRecDet }) {
  return {
    ...myRecDet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toMyRecDet(id) {
      dispatch(routerRedux.push(`/user/myrecorddetail/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRecDet);
