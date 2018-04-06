import { List, Button, Modal } from 'antd-mobile';
import styles from './index.less';

const Item = List.Item;
const alert = Modal.alert;

class DoctorSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '设置',
    };
    document.title = this.state.title;
  }
  showAlert = () => {
    const { login } = this.props;
    alert('退出', '退出后将无法收到出诊通知，确定退出么？', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => login() },
    ]);
  };
  render() {
    const { toChangePhone, toNotice, toProtectPrivacy } = this.props;
    return (
      <div className={styles.set}>
        <List className="my-list">
          <Item arrow="horizontal" multipleLine onClick={toChangePhone}>
            <img src={require('images/setphone.png')} alt="更换手机号" />更换手机号
          </Item>
          <Item arrow="horizontal" multipleLine onClick={() => { }}>
            <img src={require('images/setabout.png')} alt="关于我们" />关于我们
          </Item>
          <Item arrow="horizontal" multipleLine onClick={toNotice}>
            <img src={require('images/setnotice.png')} alt="通知" />通知
          </Item>
          <Item arrow="horizontal" multipleLine onClick={toProtectPrivacy}>
            <img src={require('images/setprotect.png')} alt="隐私保护" />隐私保护
          </Item>
        </List>
        <Button className="quit" onClick={this.showAlert}>退出登录</Button>
      </div>
    );
  }
}

export default DoctorSet;
