import { getServer } from 'utils/common';

class BaseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { details } = this.props;
    const { medical } = getServer();
    return (<div className="baseInfo part borderBottom borderTop">
      <div className="headInfo">
        <p className="headImg">
          {
            details && details.icon
            ? <img src={`${medical}/bhyy/core/image/${details.icon}`} alt="" />
            : <img src={require('assets/head.png')} alt="" />
          }
        </p>
        <p>{details.realName}</p>
      </div>
      <div className="doctorKeywords">{details.hospitalName} | {details.education} | 从业{details.workYear}年</div>
      <div className="doctorTags">
        <div className="tagItem down">
          <span className="icon iconfont icon-shenfenzheng1"></span>
          <p>真实身份认证</p>
        </div>
        <div className="tagItem down">
          <span className="icon iconfont icon-cnlonghubang"></span>
          <p>执业资格认证</p>
        </div>
        <div className="tagItem down">
          <span className="icon iconfont icon-yisheng"></span>
          <p>医师资格认证</p>
        </div>
      </div>
    </div>);
  }
}

export default BaseInfo;
