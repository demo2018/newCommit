
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import UserInfo from 'components/Customer/UserInfo';

function mapStateToProps({ userInfo }) {
  return {
    ...userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toAddRelation() {
      dispatch(routerRedux.push('/user/addrelation'));
    },
    toUpdateRelation(id, relationId) {
      dispatch(routerRedux.push(`/user/updaterelation/${id}/${relationId}`));
    },
    toUserName() {
      dispatch(routerRedux.push('/user/name'));
    },
    changeInfo(param) {
      dispatch({ type: 'userInfo/changeInfo', payload: { param } });
    },
    imgUpload(param) {
      dispatch({ type: 'userInfo/imgUpload', payload: { param } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
