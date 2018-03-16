import { Card } from 'antd-mobile';

class Diagnose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card full className="diagnose complaint borderBottom">
        <Card.Header
          className="borderBottom"
          title="诊断"
        />
        <Card.Body>
          <div>16牙位慢行牙周炎</div>
          <div>16牙位慢行牙周炎</div>
        </Card.Body>
      </Card>
    );
  }
}

export default Diagnose;
