import { List, Toast } from 'antd-mobile';

const ListItem = List.Item;

class UserFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClick() {
    Toast.info('开发中...', 1);
  }
  render() {
    const { toMyAppoint, toMyBill, toMyRec, toMyImage, toMyCoupons, toFeedback, toSet } = this.props;
    return (
      <div className="UserFun">
        <List className="acrossList">
          <ListItem className="borderBottom" onClick={() => { toMyAppoint(); }}>
            <img src={require('images/my-appoint.jpg')} alt="图标" /><span>我的预约</span>
          </ListItem>
          <ListItem className="borderBottom" onClick={() => { toMyBill(); }}>
            <img src={require('images/my-bill.jpg')} alt="图标" /><span>我的账单</span>
          </ListItem>
          {/* <ListItem className="borderBottom" onClick={() => { toMyRec(); }}> */}
          <ListItem className="borderBottom" onClick={this.onClick}>
            <img src={require('images/my-image.jpg')} alt="图标" /><span>我的病历</span>
          </ListItem>
          {/* <ListItem className="borderBottom" onClick={() => { toMyImage(); }}> */}
          <ListItem className="borderBottom" onClick={this.onClick}>
            <img src={require('images/my-med-rec.jpg')} alt="图标" /><span>我的影像</span>
          </ListItem>
        </List>
        <List className="lineList">
          {/* <ListItem className="borderBottom" onClick={() => { toMyCoupons(); }}> */}
          <ListItem className="borderBottom" onClick={this.onClick}>
            <img src={require('images/my-coupons.jpg')} alt="图标" /><span>我的优惠券</span>
          </ListItem>
          <ListItem className="borderBottom" onClick={() => { toFeedback(); }}>
            <img src={require('images/feedback.jpg')} alt="图标" />意见反馈
          </ListItem>
          <ListItem className="borderBottom" onClick={() => { toSet(); }}>
            <img src={require('images/set.jpg')} alt="图标" />设置
          </ListItem>
        </List>
      </div>
    );
  }
}

export default UserFunction;
