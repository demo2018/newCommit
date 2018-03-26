import { List } from 'antd-mobile';

const ListItem = List.Item;

class UserFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { toMyAppoint, toMyBill, toMyRec, toMyImage, toMyCoupons, toFeedback, toSet } = this.props;
    return (
      <div className="UserFun">
        <List className="acrossList">
          <ListItem className="borderBottom" onClick={() => { toMyAppoint(); }}>
            <img src={require('images/my-appoint.png')} alt="图标" /><span>我的预约</span>
          </ListItem>
          <ListItem className="borderBottom" onClick={() => { toMyBill(); }}>
            <img src={require('images/my-bill.png')} alt="图标" /><span>我的账单</span>
          </ListItem>
          <ListItem className="borderBottom" onClick={() => { toMyRec(); }}>
            <img src={require('images/my-image.png')} alt="图标" /><span>我的病历</span>
          </ListItem>
          <ListItem className="borderBottom" onClick={() => { toMyImage(); }}>
            <img src={require('images/my-med-rec.png')} alt="图标" /><span>我的影像</span>
          </ListItem>
        </List>
        <List className="lineList">
          <ListItem className="borderBottom" onClick={() => { toMyCoupons(); }}>
            <img src={require('images/my-coupons.png')} alt="图标" /><span>我的优惠券</span>
          </ListItem>
          <ListItem className="borderBottom" onClick={() => { toFeedback(); }}>
            <img src={require('images/feedback (2).png')} alt="图标" /><span>意见反馈</span>
          </ListItem>
          <ListItem className="borderBottom" onClick={() => { toSet(); }}>
            <img src={require('images/set (2).png')} alt="图标" /><span>设置</span>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default UserFunction;
