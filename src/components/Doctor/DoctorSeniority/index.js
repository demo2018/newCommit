import { Checkbox, Button, ActionSheet } from 'antd-mobile';
import styles from './index.less';

const CheckboxItem = Checkbox.CheckboxItem;

class DoctorSeniority extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '医生认证',
      btnStatus: false,
    };
    document.title = this.state.title;
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  onSubmit() {
    const { toResult, submitCheck, details } = this.props;
    // console.log(submitCheck);
    submitCheck(details);
    // toResult();
  }
  showActionSheet = () => {
    const BUTTONS = ['从相册选择图片', '拍照', '取消'];
    const { wechat } = this.props;
    wx.config({
      debug: true,
      appId: wechat.appId,
      timestamp: wechat.timestamp,
      nonceStr: wechat.nonceStr,
      signature: wechat.signature,
      jsApiList: ['chooseImage'],
    });
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      maskClosable: true,
    },
      // 点击按钮回调
      (buttonIndex) => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
        if (buttonIndex == 0) {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              console.log('hah');
            }
          });
        }
        if (buttonIndex == 1) {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'],
            sourceType: ['album'], // 制定来源为相册
            success: function (res) {
              console.log('hah');
            }
          });
        }
      });
  }

  handleCheckBoxChange(key) {
    return (value) => {
      if (value.target) {
        value = value.target.checked;
      }
      this.setState({ [key]: value });
    };
  }
  render() {
    const { details } = this.props;
    console.log(details);
    return (
      <div className={styles.doctorSeniority}>
        <div className="head borderBottom">
          <img src={require('images/last.png')} alt="" />
        </div>
        <div className="instructions borderBottom borderTop">
          <p>资格认证说明</p>
          <ul>
            <li>上传的证件仅用于认证，患者和第三方不会看到您的证件信息。</li>
            <li>拍照时，请确保姓名、照片、编号、执业医院等信息清晰可辨认。信息越齐全，越有助于认证。</li>
            <li>未经认证的医生无法使用预约等完整的功能。</li>
          </ul>
        </div>
        <div className="idCard borderTop">
          <p>身份证正面照</p>
          <div className="photohere">
            <img src={require('images/img.png')} onClick={this.showActionSheet} />
            <img src={require('images/ex1.png')} className="exampleImg" alt="" />
            <span>请上传身份证的正面照片</span>
          </div>
        </div>
        <div className="practice borderTop">
          <p>医师执业证</p>
          <div className="photohere">
            <img src={require('images/img.png')} onClick={this.showActionSheet} />
            <img src={require('images/ex2.png')} className="exampleImg" alt="" />
            <span>请上传医师执业证的第1页</span>
          </div>
          <div className="photohere">
            <img src={require('images/img.png')} onClick={this.showActionSheet} />
            <img src={require('images/ex3.png')} className="exampleImg" alt="" />
            <span>请上传医师执业证的第2页</span>
          </div>
        </div>
        <div className="seniority borderBottom borderTop">
          <p>医师资格证</p>
          <div className="photohere">
            <img src={require('images/img.png')} onClick={this.showActionSheet} />
            <img src={require('images/ex4.png')} className="exampleImg" alt="" />
            <span>请上传医师资格证的第1页</span>
          </div>
        </div>
        <div className="submit">
          <Button type="primary" onClick={() => this.onSubmit()}>提交审核</Button>
          <CheckboxItem
            checked
            size="small"
            onChange={this.handleCheckBoxChange('btnStatus')}
          >
            提交则表示同意<a className="agreement"> 《薄荷牙医医生服务协议》</a>
          </CheckboxItem>
        </div>
      </div>
    );
  }
}

export default DoctorSeniority;
