import { List, Switch } from 'antd-mobile';
import styles from './index.less';

const Item = List.Item;


class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '通知设置',
    };
    document.title = this.state.title;
  }
  handleSwitchChange(switchName) {
    return (value) => {
      this.setState({ [switchName]: value });
    };
  }
  render() {
    const state = this.state;
    // const { getFieldProps } = this.props.form;
    return (
      <div className={styles.notice}>
        <List className="my-list">
          <Item
            extra={<Switch checked={state.switch1} onChange={this.handleSwitchChange('switch1')} />}
          >患者扫码通知</Item>
          <Item
            extra={<Switch checked={state.switch2} onChange={this.handleSwitchChange('switch2')} />}
          >患者登录通知</Item>
          <Item
            extra={<Switch checked={state.switch3} onChange={this.handleSwitchChange('switch3')} />}
          >患者预约通知</Item>
          <Item
            extra={<Switch checked={state.switch4} onChange={this.handleSwitchChange('switch4')} />}
          >患者取消预约通知</Item>
          <Item
            extra={<Switch checked={state.switch5} onChange={this.handleSwitchChange('switch5')} />}
          >患者支付通知</Item>
          <Item
            extra={<Switch checked={state.switch6} onChange={this.handleSwitchChange('switch6')} />}
          >医生注册通知</Item>
          <Item
            extra={<Switch checked={state.switch7} onChange={this.handleSwitchChange('switch7')} />}
          >医生认证通知</Item>
        </List>
      </div>
    );
  }
}

export default Notice;
