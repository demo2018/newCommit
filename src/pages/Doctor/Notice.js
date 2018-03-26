
import { connect } from 'dva';

import Notice from 'components/Doctor/Notice';

function mapStateToProps({ notice }) {
  return {
    ...notice,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setNotice(id, param) {
      dispatch({ type: 'notice/setNotice', payload: { id, param } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
