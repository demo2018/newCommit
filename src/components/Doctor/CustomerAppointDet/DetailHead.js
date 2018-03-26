import { Card } from 'antd-mobile';

class DetailHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //  获取项目
  renderProjects() {
    const { details, projects } = this.props;
    return (projects.content || [])
      .filter(({ id }) => {
        return details.itemClassId && details.itemClassId == id;
      })
      .map(({ id, className }, index) => {
        return (<span key={index}>{className}</span>);
      });
  }
  render() {
    const { details } = this.props;
    return (
      <div className="appointDetHeadContent">
        <div className="card-header">
          账单号：<span className="billno">{details.appointId}</span>
        </div>
        <Card full>
          <Card.Header
            title={details.patientName}
          />
          <Card.Body>
            <ul>
              <li className="diagnosisPro"><img src={require('images/tooth.png')} alt="" />就诊项目：{this.renderProjects()}</li>
              <li className="clinic-time"><img src={require('images/clock.png')} alt="" />就诊时间：
                <span className="clinic-date">{details.time}</span>
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

export default DetailHead;
