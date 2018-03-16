import { Card } from 'antd-mobile';

class BillDetHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { details } = this.props;
    return (
      <div className="billDetHeadContent">
        <div className="card-header">
          账单号：<span className="billno">{details.billId}</span>
        </div>
        <Card full>
          <Card.Header
            title={details.patientName}
            extra={details.status == 1 ? '已支付' : '未支付'}
          />
          <Card.Body>
            <ul>
              <li className="diagnosisPro"><img src={require('images/tooth.png')} alt="" />就诊项目：<span>{details.itemName}</span></li>
              <li className="clinic-time"><img src={require('images/clock.png')} alt="" />就诊时间：
                <span className="clinic-date">{details.createTime}</span>
              </li>
              <li><img src={require('images/doctor.png')} alt="" />就诊医生：<span className="clinic-doctor">{details.doctorName}</span></li>
              <li className="clinic-place"><img src={require('images/place.png')} alt="" /><em>就诊地点：</em><span className="clinic-address">{details.address}</span></li>
            </ul>
          </Card.Body>
        </Card>
      </div>

    );
  }
}

export default BillDetHead;
