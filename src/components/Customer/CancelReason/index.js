import { List, Radio, Button } from 'antd-mobile';
import styles from './index.less';

const RadioItem = Radio.RadioItem;
const data = [
  { value: 0, label: '有其他安排' },
  { value: 1, label: '改约其他天' },
  { value: 2, label: '改约其他医生' },
  { value: 3, label: '其他原因' },
];

class CancelReason extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '取消原因',
      value: 0,
      cancel: {
        cancelReason: '有其他安排',
        status: 4
      }
    };
    document.title = this.state.title;
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = (value) => {
    this.setState({ value, cancel: { cancelReason: data[value].label, status: 4 } });
  };
  onSubmit() {
    const { updateAppoint } = this.props;
    const { cancel } = this.state;
    updateAppoint(cancel);
  }
  render() {
    return (
      <div className={styles.cancelReason}>
        <List renderHeader={() => '您取消预约的原因？'}>
          {data.map(i => (
            <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this.onChange(i.value)}>
              {i.label}
            </RadioItem>
          ))}
        </List>
        <Button type="primary" size="large" onClick={this.onSubmit}>确定取消</Button>
      </div>
    );
  }
}

export default CancelReason;
