
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MyImgDet from 'components/Customer/MyImgDet';

function mapStateToProps({ myImgDet }) {
  return {
    ...myImgDet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toMyImgDet(id) {
      dispatch(routerRedux.push(`/user/myimagedetail/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyImgDet);
