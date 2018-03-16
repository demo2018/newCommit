import { Card } from 'antd-mobile';

class PresentIllness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Card full className="presentIllness complaint borderBottom">
          <Card.Header
            className="borderBottom"
            title="现病史"
          />
          <Card.Body>
            <div>三个月来刷牙牙龈出血，用清水漱口后可以停止。有时吃东西也会出血，有明显疼痛，前来就诊。刷牙每天2次，每次3分钟。</div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default PresentIllness;
