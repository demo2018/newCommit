
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import DoctorAppoint from 'components/Common/DoctorAppoint';

function mapStateToProps({ doctorAppoint }) {
  return {
    ...doctorAppoint
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toAppointOther(id) {
      //  存储初始值以判断跳转页面（跳转见新增关系人员model层）
      localStorage.setItem('toAdd', id);
      dispatch(routerRedux.push('/user/addrelation'));
    },
    toUserName(id) {
      //  存储初始值以判断跳转页面（跳转见个人中心model层）
      localStorage.setItem('toAdd', id);

      dispatch(routerRedux.push('/user/name'));
    },
    toResult() {
      dispatch(routerRedux.push('/common/doctors/appointresult'));
    },
    addAppoint(param) {
      dispatch({ type: 'doctorAppoint/addAppoint', payload: { param } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorAppoint);
