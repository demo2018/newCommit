import { Card } from 'antd-mobile';

class RecHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Card full>
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
      </div>
    );
  }
}

export default RecHead;
