import { List, Radio, Button, Toast } from 'antd-mobile';

const RadioItem = Radio.RadioItem;

class Pay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  onChange = (value) => {
    this.setState({
      value,
    });
  };
  onSubmit() {
    const { toEvaluate } = this.props;
    if (this.state.value == 0) {
      toEvaluate();
    } else if (this.state.value == 1) {
      Toast.info('您选择了其它支付方式');
    }
  }
  render() {
    const { value } = this.state;
    const data = [
      { value: 0, label: '微信支付', icon: './wechat.png' },
      { value: 1, label: '其他支付', icon: './other.png' },
    ];
    return (
      <div className="pay">
        <List>
          {data.map(i => (
            <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
              <img src={require(i.icon)} alt="" />{i.label}
            </RadioItem>
          ))}
        </List>
        <Button type="primary" size="large" onClick={() => { this.onSubmit(); }}>确定</Button>
      </div>
    );
  }
}


export default Pay;
