import { Button, ActivityIndicator } from 'antd-mobile';
import styles from './index.less';
import Question from './Question';
import More from './More';


class MyAppoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我的预约',
    };
    document.title = this.state.title;
  }
  // 新增预约
  renderListNew() {
    const { listNew, toCancel } = this.props;
    return (listNew || []).map(({ realName, className, time, address, id }, index) => {
      return (
        <li className="borderBottom borderTop" key={index}>
          <div className="myAppointdet">
            <img src={require('assets/head.png')} alt="头像加载失败" />
            <div className="appointRight">
              <ul>
                <li>
                  <More toCancel={() => toCancel(id)} />
                </li>
                <li className="userName">{realName}</li>
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
    return (listConfirm || []).map(({ realName, className, time, address, id }, index) => {
      return (
        <li className="borderBottom borderTop" key={index}>
          <div className="myAppointdet">
            <img src={require('assets/head.png')} alt="头像加载失败" />
            <div className="appointRight">
              <ul>
                <li>
                  <More times={time} toCancel={() => toCancel(id)} />
                </li>
                <li className="userName">{realName}</li>
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

  //  取消预约
  renderListCancel() {
    const { listCancel } = this.props;
    return (listCancel || []).map(({ realName, className, time, address }, index) => {
      return (
        <li className="borderBottom borderTop" key={index}>
          <div className="myAppointdet">
            <img src={require('assets/head.png')} alt="头像加载失败" />
            <div className="appointRight">
              <ul>
                <li>
                  <span>已取消</span>
                </li>
                <li className="userName">{realName}</li>
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
    let test = false;
    if (listCancel[0] || listConfirm[0] || listNew[0]) {
      test = true;
    }
    return (
      <div className={styles.myAppoint}>
        <ActivityIndicator animating={loading} toast />
        <ul className="appointWarp">
          {
            test
              ? <div>
                {/* {this.renderListNew()} */}
                {this.renderListConfirm()}
                {this.renderListCancel()}
              </div>
              : <p className="noAppoint">对不起，您还没有预约医生哦！</p>
          }
        </ul>
        <Button type="primary" size="large" onClick={toAppoint}>我要预约</Button>
      </div>
    );
  }
}

export default MyAppoint;
