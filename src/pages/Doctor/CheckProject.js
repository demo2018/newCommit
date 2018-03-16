
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import CheckProject from 'components/Doctor/CheckProject';

function mapStateToProps({ checkProject }) {
  return {
    ...checkProject,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateState(state) {
      dispatch({ type: 'checkProject/updateState', payload: state });
    },
    getProjects(id) {
      dispatch({ type: 'checkProject/getProjects', payload: { id } });
    },
    toBill() {
      dispatch(routerRedux.push('/doctor/billdetail'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckProject);
