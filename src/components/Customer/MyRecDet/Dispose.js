import { Card } from 'antd-mobile';

class Dispose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card full className="diagnose complaint borderBottom">
        <Card.Header
          className="borderBottom"
          title="处置"
        />
        <Card.Body>
          <div>向患者交代病情、治疗计划及相关费用，患者知情同意，要求治疗</div>
          <div>OHI，3%双氧水含漱半分钟，超声龈上洁治，3%双氧水冲洗，上碘甘油。</div>
        </Card.Body>
      </Card>
    );
  }
}

export default Dispose;
