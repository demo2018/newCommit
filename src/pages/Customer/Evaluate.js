
import { connect } from 'dva';

import Evaluate from 'components/Customer/Evaluate';

function mapStateToProps({ evaluate, myBillDet }) {
  return {
    ...evaluate,
    ...myBillDet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addEvaluate(param) {
      dispatch({ type: 'evaluate/addEvaluate', payload: { param } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Evaluate);
