
import { connect } from 'dva';

import MyCard from 'components/Doctor/MyCard';

function mapStateToProps({ myCard }) {
  return {
    ...myCard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCard);
