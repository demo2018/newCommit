import { Popover } from 'antd-mobile';

const Item = Popover.Item;

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionvisible: false,
      questionselected: '',
    };
  }
  onSelectQuestion = (opt) => {
    this.setState({
      questionvisible: false,
      questionselected: opt.props.value,
    });
  };
  handleVisibleChangeQuestion = (questionvisible) => {
    this.setState({
      questionvisible,
    });
  };
  render() {
    return (
      <Popover
        mask
        overlayClassName="forquestion"
        overlayStyle={{ color: 'currentColor' }}
        visible={this.state.questionvisible}
        overlay={[
          (<Item key="2" value="取消预约" data-seed="logId" style={{ height: '44px', lineHeight: '1.5', padding: '8px' }}>具体就诊时间请等待您的私人<br />口腔健康管家联系您！</Item>),
          (<Item key="3" value="关闭">关闭</Item>),
        ]}
        align={{
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [1, 7],
        }}
        onVisibleChange={this.handleVisibleChangeQuestion}
        onSelect={this.onSelectQuestion}
      >
        <div
          style={{
            height: '17px',
            width: '17px',
            paddingLeft: '10px',
            display: 'inline-block',
            alignItems: 'center',
            verticalAlign: '-2px',
          }}
        >
          <img src={require('images/question.png')} alt="详情咨询" />
        </div>
      </Popover>);
  }
}

export default Question;
