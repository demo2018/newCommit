import { Card } from 'antd-mobile';

class Examine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card full className="complaint borderBottom">
        <Card.Header
          className="borderBottom"
          title="检查"
        />
        <Card.Body>
          <div>1 全口卫生状况一般，软垢（   ）、色素（   ），牙石（   ），其中下颌前牙舌侧牙石覆盖牙体______。BI普遍2~4，PD≈1~3mm。多颗牙龈缘及龈乳头色深红，肿胀，点彩消失。未探及松动牙，叩诊均未见异常。</div>
          <div>2 全口卫生状况一般，软垢（   ）、色素（   ），牙石（   ），其中下颌前牙舌侧牙石覆盖牙体______。BI普遍2~4，PD≈1~3mm。多颗牙龈缘及龈乳头色深红，肿胀，点彩消失。未探及松动牙，叩诊均未见异常。 </div>
        </Card.Body>
      </Card>
    );
  }
}

export default Examine;
