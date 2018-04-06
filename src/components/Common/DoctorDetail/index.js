import { Modal } from 'antd-mobile';
import BaseInfo from './BaseInfo';
import Description from './Description';
import Schedule from './Schedule';
import styles from './index.less';
import { getServer } from 'utils/common';

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

class DoctorDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '医生详情',
      modal: false,
    };
    document.title = this.state.title;
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  // 修复ios端拨打电话时弹出三次弹窗问题
  phone() {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    if (isAndroid) {
      Modal.alert('提示', '确定拨打电话：400-9696-791吗？', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => (window.location.href = 'tel://400-9696-791') },
      ]);
    }
    if (isiOS) {
      window.location.href = 'tel://400-9696-791';
    }
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  render() {
    const { toDoctorAppoint, details, dateTime, tags } = this.props;
    const doctorInfoDetailProps = { details, dateTime, tags };
    const { medical } = getServer();
    return (
      <div className={styles.doctorDetail}>
        {/* // 基本信息 */}
        <BaseInfo {...doctorInfoDetailProps} />
        {/* //描述 */}
        <Description {...doctorInfoDetailProps} />
        {/* // 出诊安排 */}
        <Schedule {...doctorInfoDetailProps} toDoctorAppoint={toDoctorAppoint} />

        {/* //  联系助理 */}
        <div className="connect_doctor">
          <p className="phone" onClick={this.phone}>
            <span className="icon iconfont icon-iconfontdianhua2"></span>
            拨打电话
          </p>
          <p onClick={this.showModal('modal')}>
            <span className="icon iconfont icon-xinxi"></span>
            联系医生助理
          </p>
          <Modal
            className="addAssistant"
            visible={this.state.modal}
            transparent
            closable
            onClose={this.onClose('modal')}
            title={myImg(`${medical}/bhyy/core/image/${details.assistantQr}`)}
            footer={[{ text: '确定', onPress: () => { this.onClose('modal')(); } }]}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          >
          <div>
            <p>添加医生助理luna为好友</p>
            一键预约,安心看牙
          </div>
        </Modal>
        </div>
      </div>);
  }
}
export default DoctorDetail;
