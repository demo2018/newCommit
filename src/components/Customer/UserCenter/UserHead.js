import { getServer } from 'utils/common';

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
    const { toUserInfo } = this.props;
    const { userHead } = this.state;
    const { medical } = getServer();
    return (
      < div className="userHead borderBottom" style={{ background: `url(${require('images/user-bg.png')}) no-repeat center center` }}>
        <div className="headInfo" onClick={() => { toUserInfo(); }}>
          {
            userHead.icon
              ? <img className="headImg" src={`${medical}/bhyy/core/image/${userHead.icon}`} alt="头像加载失败" />
              : <img className="headImg" src={require('assets/head.png')} alt="头像加载失败" />
          }
          <p className="userName">{userHead.realName}</p>
        </div>
      </div>);
  }
}

export default UserHead;
