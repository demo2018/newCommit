
import { connect } from 'dva';

import ProtectPrivacy from 'components/Common/ProtectPrivacy';

function mapStateToProps({ protectPrivacy }) {
  return {
    ...protectPrivacy,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectPrivacy);
