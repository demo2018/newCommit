
import { connect } from 'dva';

import ChangePhone from 'components/Common/ChangePhone';

function mapStateToProps({ changePhone }) {
  return {
    ...changePhone,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePhone(param) {
      dispatch({ type: 'changePhone/changePhone', param });
    },
    changeCode(param) {
      dispatch({ type: 'changePhone/changeCode', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePhone);
