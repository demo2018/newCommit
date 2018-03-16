import { List, Button } from 'antd-mobile';
import styles from './index.less';

const Item = List.Item;


class Set extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '设置',
    };
    document.title = this.state.title;
    this.handleOut = this.handleOut.bind(this);
  }
  handleOut() {
    const { login } = this.props;
    login();
  }
  render() {
    const { toChangePhone } = this.props;
    return (
      <div className={styles.set}>
        <List className="my-list">
          <Item arrow="horizontal" multipleLine onClick={toChangePhone}>
            <img src={require('images/changephone.jpg')} alt="更换手机号" />更换手机号
          </Item>
          <Item arrow="horizontal" multipleLine onClick={() => { }}>
            <img src={require('images/aboutus.jpg')} alt="关于我们" />关于我们
          </Item>
          <Item arrow="horizontal" multipleLine onClick={() => { }}>
            <img src={require('images/protect.jpg')} alt="隐私保护" />隐私保护
          </Item>
        </List>
        <Button className="quit" onClick={this.handleOut}>退出登录</Button>
      </div>
    );
  }
}

export default Set;
