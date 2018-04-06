import QRCode from 'qrcode.react';
import styles from './index.less';
import cookie from 'js-cookie';

class DoctorSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我的名片',
    };
    document.title = this.state.title;
  }
  render() {
    const { details } = this.props;
    const locationHref = location.href.split('#')[0];
    return (
      <div className={styles.myCard}>
        <div className="cardHead">
          <p className="myImg"><img src={require('assets/head.png')} alt="" /></p>
          <p className="myName">{details.realName}</p>
          <p className="myTitle"><span>{details.hospitalName}</span><span>{details.education}</span></p>
          <p className="myIntro">简介：
            <span className="intro">{details.intro}</span>
          </p>
          {
            details.status == 1
            ? <p className="already"><img src={require('images/already.png')} alt="" /></p>
            : null
          }
        </div>
        <div className="add">
          <QRCode value={`${locationHref}#/doctor/doctorcard/${cookie.get('doctorid')}`} />
          <p>添加医生助理为好友，预约好牙医</p>
        </div>
      </div>
    );
  }
}

export default DoctorSet;
