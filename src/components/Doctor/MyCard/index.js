
import styles from './index.less';

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
    console.log(details)
    return (
      <div className={styles.myCard}>
        <div className="cardHead">
          <p className="myImg"><img src={require('assets/head.png')} alt="" /></p>
          <p className="myName">{details.realName}</p>
          <p className="myTitle"><span>{details.hospitalName}</span><span>{details.title}</span></p>
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
          <img src={require('assets/QR-code.png')} alt="" />
          <p>添加医生助理为好友，预约好牙医</p>
        </div>
      </div>
    );
  }
}

export default DoctorSet;