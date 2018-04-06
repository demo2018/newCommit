import { Button, ActivityIndicator } from 'antd-mobile';
import styles from './index.less';
import Question from './Question';
import More from './More';
import { getServer } from 'utils/common';

const { medical } = getServer();
//  获取当前时间戳判断订单日期是否已过期
const now = new Date().getTime();

class MyAppoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我的预约',
    };
    document.title = this.state.title;
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }
  // 新增预约
  renderListNew() {
    const { listNew, toCancel } = this.props;

    return (listNew || []).map(({ realName, className, time, address, id, patientName, doctorIcon }, index) => {
      const status = new Date(time.slice(0, 10)).getTime();
      return (
        <li className="borderBottom borderTop" key={index}>
          <div className="myAppointdet">
            <div className="imgWrap"><img src={`${medical}/bhyy/core/image/${doctorIcon}`} alt="头像加载失败" /></div>
            <div className="appointRight">
              <ul>
                <li>
                  {
                    now < status
                    ? <More toCancel={() => toCancel(id)} />
                    : <span>已过期</span>
                  }
                </li>
                <li className="userName">{realName}</li>
                <li className="appointPatient">就诊人：<span>{patientName}</span></li>
                <li className="appointPro">预约项目：<span>{className}</span></li>
                <li className="clinic-time">就诊时间：
                  <span className="clinic-date">{time}</span>
                  <Question />
                </li>
                <li className="clinic-place">就诊地点：<span>{address}</span></li>
              </ul>
            </div>
          </div>
        </li>
      );
    });
  }
  // 已确认预约
  renderListConfirm() {
    const { listConfirm, toCancel } = this.props;
    return (listConfirm || []).map(({ realName, className, time, address, id, patientName, doctorIcon }, index) => {
      const status = new Date(time.slice(0, 10)).getTime();
      return (
        <li className="borderBottom borderTop" key={index}>
          <div className="myAppointdet">
            <div className="imgWrap"><img src={`${medical}/bhyy/core/image/${doctorIcon}`} alt="头像加载失败" /></div>
            <div className="appointRight">
              <ul>
                <li>
                  {
                    now < status
                      ? <More times={time} toCancel={() => toCancel(id)} />
                      : <span>已过期</span>
                  }
                </li>
                <li className="userName">{realName}</li>
                <li className="appointPatient">就诊人：<span>{patientName}</span></li>
                <li className="appointPro">预约项目：<span>{className}</span></li>
                <li className="clinic-time">就诊时间：
                  <span className="clinic-date">{time}</span>
                </li>
                <li className="clinic-place">就诊地点：<span>{address}</span></li>
              </ul>
            </div>
          </div>
        </li>
      );
    });
  }

  //  取消预约
  renderListCancel() {
    const { listCancel } = this.props;
    return (listCancel || []).map(({ realName, className, time, address, patientName, doctorIcon }, index) => {
      return (
        <li className="borderBottom borderTop" key={index}>
          <div className="myAppointdet">
            <div className="imgWrap"><img src={`${medical}/bhyy/core/image/${doctorIcon}`} alt="头像加载失败" /></div>
            <div className="appointRight">
              <ul>
                <li>
                  <span>已取消</span>
                </li>
                <li className="userName">{realName}</li>
                <li className="appointPatient">就诊人：<span>{patientName}</span></li>
                <li className="appointPro">预约项目：<span>{className}</span></li>
                <li className="clinic-time">就诊时间：
                  <span className="clinic-date">{time}</span>
                </li>
                <li className="clinic-place">就诊地点：<span>{address}</span></li>
              </ul>
            </div>
          </div>
        </li>
      );
    });
  }
  render() {
    const { toAppoint, listCancel, listConfirm, listNew, loading } = this.props;
    return (
      <div className={styles.myAppoint}>
        <ActivityIndicator animating={loading} toast />
        <ul className="appointWarp">
          {this.renderListNew()}
          {this.renderListConfirm()}
          {this.renderListCancel()}
          {
            (!listCancel[0] && !listConfirm[0] && !listNew[0])
            && <p className="noAppoint">对不起，您还没有预约医生哦！</p>
          }
          <Button type="primary" size="large" onClick={toAppoint}>我要预约</Button>
        </ul>
      </div>
    );
  }
}

export default MyAppoint;

