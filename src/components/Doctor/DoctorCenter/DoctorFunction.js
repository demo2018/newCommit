import { List, Toast } from 'antd-mobile';


const ListItem = List.Item;

class DoctorFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClick() {
    Toast.info('开发中...', 1);
  }
  render() {
    const { toDoctorCard, toMyWallet, toNotice, toFeedback, toDoctorSet } = this.props;
    return (
      <div className="doctorFun">
        <List>
          <ListItem
            arrow="horizontal"
            onClick={toDoctorCard}
          >
            <img src={require('images/my-card.png')} alt="图标" />我的名片
          </ListItem>
          <ListItem
            arrow="horizontal"
            onClick={toMyWallet}
          >
            <img src={require('images/my-wallet.png')} alt="图标" />我的钱包
          </ListItem>
          <ListItem
            arrow="horizontal"
            onClick={() => { this.onClick(); }}
          >

            {/* onClick={toNotice} */}
            <img src={require('images/my-notice.png')} alt="图标" />我的通知
          </ListItem>
          <ListItem
            arrow="horizontal"
            onClick={toFeedback}
          >
            <img src={require('images/feedback.png')} alt="图标" />意见反馈
          </ListItem>
          <ListItem
            arrow="horizontal"
            onClick={toDoctorSet}
          >
            <img src={require('images/set.png')} alt="图标" />设置
          </ListItem>
        </List>
      </div>
    );
  }
}

export default DoctorFunction;
