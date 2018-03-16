import { Card } from 'antd-mobile';
import { formatDate } from 'utils/common';

class MyBillDetHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { details } = this.props;
    return (
      <div className="myBillDetHeadContent">
        <div className="card-header">
          账单号：<span className="billno">{details.billId}</span>
        </div>
        <Card full>
          <Card.Header
            title={details.patientName}
            extra={<span>
              { // 未支付
                !details.status ? '未支付' : null
              }
              { // 已评价
                details.status && details.isComment ? '已评价' : null
              }
              {  // 已支付未评价
                details.status && !details.isComment ? '已支付' : null
              }
            </span>}
          />
          <Card.Body>
            <ul>
              <li className="diagnosisPro">就诊项目：<span>{details.itemName}</span></li>
              <li className="clinic-time">就诊时间：
                <span className="clinic-date">{formatDate(details.createTime)}</span>
              </li>
              <li>就诊医生：<span className="clinic-doctor">{details.doctorName}</span></li>
              <li className="clinic-place"><em>就诊地点：</em><span className="clinic-address">{details.address}</span></li>
            </ul>
          </Card.Body>
        </Card>
      </div>

    );
  }
}

export default MyBillDetHead;
