import { Card } from 'antd-mobile';

class Orthodontic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Card full className="complaint orthodontic">
          <Card.Header
            className="borderBottom"
            title="检查"
          />
          <Card.Body>
            <p>颌类型：乳</p>
            <p>前牙覆颌：Ⅰ</p>
            <p>咬伤龈肉：有</p>
            <p>前牙覆盖：Ⅱ</p>
            <p>前牙开颌：Ⅱ</p>
            <p>牙列拥挤：上牙弓    Ⅲ</p>
            <p>中线：上  左偏2mm</p>
            <p>颌体：上颌  正常</p>
            <p>齿槽座：上   丰满</p>
            <p>面部：对称</p>
            <p>面中1/3：正常</p>
            <p>面下1/3：过短</p>
            <p>颌唇沟：明显</p>
            <p>开唇露齿：轻</p>
            <p>颌靥窝：</p>
            <p>关节检查：未见异常</p>
            <p>健康情况：鼻咽部疾病：扁桃体肥大</p>
            <p>不良习惯：吮指</p>
            <p>不良习惯起止时间：自幼</p>
            <p>喂养:</p>
            <p>因素机制:</p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Orthodontic;
