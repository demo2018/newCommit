import { getServer } from 'utils/common';

class DoctorHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { toCertification, toDoctorInfo, toAuthenticationFailed, details } = this.props;
    const { medical } = getServer();
    return (
      <div className="doctorHead borderBottom">
        <div className="headInfo">
          <img className="headImg" src={`${medical}/bhyy/core/image/${details.icon}`} alt="头像加载失败" onClick={toDoctorInfo} />
          <p className="doctorName">{details.realName}</p>
          {
            details.status == 0 &&
              <div>
                <p className="go-certification" onClick={toCertification}><a>去认证</a></p>
                <p className="certification-tip">完善资料，上传证书，加入薄荷</p>
              </div>
          }
          {
            details.status == 1 &&
              <div>
                <p className="already-certification"><a>已认证</a></p>
                <p className="doctor-title">{details.hospitalName} | {details.title}</p>
              </div>
          }
          {
            details.status == 2 &&
              <div>
                <p className="certification-defeat" onClick={toAuthenticationFailed}><a>认证失败</a></p>
              </div>
          }
          {
            details.status == 3 &&
              <div>
                <p className="review"><a>停诊中</a></p>
              </div>
          }
          {
            details.status == 4 &&
              <div>
                <p className="review"><a>审核中</a></p>
              </div>
          }
        </div>
      </div>);
  }
}

export default DoctorHead;
