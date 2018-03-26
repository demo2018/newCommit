import { getServer } from 'utils/common';

class CardInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { doctorInfo } = this.props;
    const { medical } = getServer();
    return (
      <div className="cardInfo">
        <div className="cardHead">
          <p className="myImg"><img src={require('assets/head.png')} alt="" /></p>
          <p className="myName">{doctorInfo.realName}</p>
          <p className="myTitle"><span>{doctorInfo.hospitalName}</span><span>{doctorInfo.education}</span></p>
          <p className="myIntro">简介：
            <span className="intro">{doctorInfo.intro}</span>
          </p>
          <div className="add">
            <img src={`${medical}/bhyy/core/image/${doctorInfo.assistantQr}`} alt="" />
            <p>添加医生助理为好友，预约好牙医</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CardInfo;
