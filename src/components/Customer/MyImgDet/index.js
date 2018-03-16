import { Card } from 'antd-mobile';
import styles from './index.less';

class MyImgDet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我的影像',
    };
    document.title = this.state.title;
  }
  render() {
    return (
      <div className={styles.myImgDet}>
        <Card full className="header">
          <Card.Header
            className="borderBottom"
            title="李四"
            extra={<span>初诊</span>}
          />
          <Card.Body>
            <ul>
              <li className="diagnosisPro">诊断项目：<span>正畸</span></li>
              <li className="clinic-time">就诊时间：
                <span className="clinic-date">2018-1-21</span>
                <span className="clinic-period ">14:30</span>
              </li>
              <li className="clinic-doctor">就诊医生：<span>南哲</span></li>
              <li className="clinic-name">诊所名称：<span>欢乐口腔</span></li>
            </ul>
          </Card.Body>
        </Card>
        <div className="imageDetail borderTop">
          <div className="positive">
            <img src={require('assets/my_img.jpg')} alt="正位图" />
            <p>
              <span className="imgPosition">正位</span>
              <span className="imgDate">2018-1-30</span>
              <span className="imgTime">10:30</span>
            </p>
          </div>
          <div className="side">
            <img src={require('assets/my_img.jpg')} alt="侧位图" />
            <p>
              <span className="imgPosition">侧位</span>
              <span className="imgDate">2018-1-30</span>
              <span className="imgTime">10:30</span>
            </p>
          </div>
        </div>
        <div className="imgResult borderBottom borderTop">
          <p>备注：<span>深度龋齿，需要治疗</span></p>
        </div>
      </div>
    );
  }
}

export default MyImgDet;
