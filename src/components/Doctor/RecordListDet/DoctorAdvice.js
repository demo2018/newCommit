import { Card } from 'antd-mobile';

class DoctorAdvice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Card full className="complaint borderBottom">
          <Card.Header
            className="borderBottom"
            title="医嘱"
          />
          <Card.Body>
            <div>4颗智齿建议拔出，牙周治疗， 建议正畸治疗</div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default DoctorAdvice;
