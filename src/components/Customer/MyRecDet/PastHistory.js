import { Card } from 'antd-mobile';

class PastHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card full className="presentIllness complaint borderBottom">
        <Card.Header
          className="borderBottom"
          title="既往史"
        />
        <Card.Body>
          <div>无</div>
        </Card.Body>
      </Card>
    );
  }
}

export default PastHistory;
