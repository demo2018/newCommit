import { List, Switch } from 'antd-mobile';
import styles from './index.less';

const Item = List.Item;


class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '通知设置',
      data: {},
    };
    document.title = this.state.title;
  }
  handleSwitchChange(switchName, key) {
    const { data } = this.state;
    const { setNotice } = this.props;
    const { details = [] } = this.props;
    return (value) => {
      this.setState({ data: { ...data, [switchName]: value, } });
      if (value == true) {
        setNotice(details[key].id, { status: 1 });
      } else {
        setNotice(details[key].id, { status: 0 });
      }
    };
  }
  render() {
    const { data } = this.state;
    const { details } = this.props;
    return (
      <div className={styles.notice}>
        <List className="my-list">
          <Item
            extra={<Switch
              checked={data.status0 != null ? data.status0 : details[0] && details[0].status}
              onChange={this.handleSwitchChange('status0', 0)}
            />}
          >患者扫码通知</Item>
          <Item
            extra={<Switch
              checked={data.status1 != null ? data.status1 : details[1] && details[1].status}
              onChange={this.handleSwitchChange('status1', 1)}

            />}
          >患者登录通知</Item>
          <Item
            extra={<Switch
              checked={data.status2 != null ? data.status2 : details[2] && details[2].status}
              onChange={this.handleSwitchChange('status2', 2)}
            />}
          >患者预约通知</Item>
          <Item
            extra={<Switch
              checked={data.status3 != null ? data.status3 : details[3] && details[3].status}
              onChange={this.handleSwitchChange('status3', 3)}
            />}
          >患者取消预约通知</Item>
          <Item
            extra={<Switch
              checked={data.status4 != null ? data.status4 : details[4] && details[4].status}
              onChange={this.handleSwitchChange('status4', 4)}
            />}
          >患者支付通知</Item>
          <Item
            extra={<Switch
              checked={data.status5 != null ? data.status5 : details[5] && details[5].status}
              onChange={this.handleSwitchChange('status5', 5)}
            />}
          >医生注册通知</Item>
          <Item
            extra={<Switch
              checked={data.status6 != null ? data.status6 : details[6] && details[6].status}
              onChange={this.handleSwitchChange('status6', 6)}
            />}
          >医生认证通知</Item>
        </List>
      </div>
    );
  }
}

export default Notice;
