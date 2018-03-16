
class UserHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userHead: props.details,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ userHead: nextProps.details });
    }
  }
  render() {
    const { toUserInfo, details } = this.props;
    const { userHead } = this.state;
    return (
      < div className="userHead borderBottom" style={{ background: `url(${require('images/user-bg.png')}) no-repeat center center` }}>
        <div className="headInfo" onClick={() => { toUserInfo(); }}>
          <img className="headImg" src={userHead.icon} alt="头像加载失败" />
          <p className="userName">{userHead.realName}</p>
        </div>
      </div>);
  }
}

export default UserHead;
