import { List, InputItem, Button } from 'antd-mobile';
import styles from './index.less';

class CustomerName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '姓名',
      details: props.details,
    };
    document.title = this.state.title;
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ details: nextProps.details });
    }
  }
  handleUpdate() {
    const { changeInfo } = this.props;
    const { details } = this.state;
    changeInfo(details);
  }
  handleChange(key) {
    const { details } = this.state;
    return (value) => {
      this.setState({ details: { ...details, [key]: value } });
    };
  }
  render() {
    const { details } = this.state;
    console.log(details);

    return (
      <div className={styles.customerName}>
        <List>
          <InputItem value={details.realName} placeholder="输入姓名" onChange={this.handleChange('realName')} clear />
        </List>
        <p>为方便就诊，请输入真实姓名</p>
        <Button onClick={this.handleUpdate}>确认</Button>
      </div>
    );
  }
}

export default CustomerName;
