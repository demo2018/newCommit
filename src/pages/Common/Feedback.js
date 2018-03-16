
import { connect } from 'dva';

import Feedback from 'components/Common/Feedback';

function mapStateToProps({ feedback }) {
  return {
    ...feedback,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    feedbackSubmit(param) {
      dispatch({ type: 'feedback/feedbackSubmit', param });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
