
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import AddRelation from 'components/Customer/AddRelation';

function mapStateToProps({ addRelation }) {
  return {
    ...addRelation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toUserInfo() {
      dispatch(routerRedux.push('/user/userinfo'));
    },
    upDateRelation(param) {
      dispatch({ type: 'addRelation/upDateRelationinfo', payload: { param } });
    },
    addRelation(param) {
      dispatch({ type: 'addRelation/addRelationinfo', payload: { param } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRelation);
