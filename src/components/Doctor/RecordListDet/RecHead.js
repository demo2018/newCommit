import { Card } from 'antd-mobile';
import { formatDate } from 'utils/common';

class RecHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { details } = this.props;
    return (
      <Card full>
        <Card.Header
          className="borderBottom"
          title={details.customerName}
          extra={details.type == 0 && <span>初诊</span> || details.type == 1 && <span>复诊</span>}
        />
        <Card.Body>
          <ul>
            <li className="diagnosisPro">诊断项目：<span>正畸</span></li>
            <li className="clinic-time">就诊时间：
              <span className="clinic-date">{formatDate(details.createTime)}</span>
            </li>
            <li className="clinic-doctor">就诊医生：<span>{details.doctorName}</span></li>
            <li className="clinic-name">诊所名称：<span>{details.hospitalName}</span></li>
          </ul>
        </Card.Body>
      </Card>
    );
  }
}

export default RecHead;
