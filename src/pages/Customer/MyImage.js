
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import MyImage from 'components/Customer/MyImage';

function mapStateToProps({ myImage }) {
  return {
    ...myImage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toMyImgDet(id) {
      dispatch(routerRedux.push(`/user/myimagedetail/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyImage);
