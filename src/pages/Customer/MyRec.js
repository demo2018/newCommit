
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MyRec from 'components/Customer/MyRec';

function mapStateToProps({ myRec }) {
  return {
    ...myRec,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toMyRecDet(id) {
      dispatch(routerRedux.push(`/user/myrecorddetail/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRec);
