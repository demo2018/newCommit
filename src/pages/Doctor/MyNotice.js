
import { connect } from 'dva';
import MyNotice from 'components/Doctor/MyNotice';

function mapStateToProps({ userCenter }) {
  return {
    ...userCenter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNotice);
