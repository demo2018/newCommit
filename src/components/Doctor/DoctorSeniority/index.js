import { Checkbox, Button, ActionSheet, Toast } from 'antd-mobile';
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
    submitCheck({ ...details, status: 4 });
    // toResult();
  }
  // 上传图片接口
  wxuploadImage = (e, key) => {
    const { imgUpload } = this.props;
    wx.uploadImage({
      localId: e, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: (res) => {
        const mediaId = res.serverId; // 返回图片的服务器端ID
        alert(mediaId);
        // if (mediaId) {.
        // 回传servsrId给后台
        imgUpload({ mediaId, key });

        // this.wxImgDown(mediaId);
        // }
      },
      fail: (error) => {
        Toast.info(error);
      }
    });
  }
  showActionSheet = (key) => {
    const BUTTONS = ['从相册选择图片', '拍照', '取消'];
    const { wechat } = this.props;

    //  获取微信配置
    wx.config({
      debug: true,
      appId: wechat.appId,
      timestamp: wechat.timestamp,
      nonceStr: wechat.nonceStr,
      signature: wechat.signature,
      jsApiList: ['chooseImage', 'uploadImage', 'downloadImage']
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
            count: 1, //  可选择照片的数量
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], // 指定来源为相册
            success: (res) => {
              const localIds = res.localIds[0].toString();
              alert(localIds);
              // const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              // changeInfo({ ...doctorInfo, icon: getBase64(localIds) });
              this.wxuploadImage(localIds, key);

              // getUploadPicUrl({ type: 'icon' });
              // changeInfo({ ...doctorInfo, icon: localId });
            }
          });
        }
        if (buttonIndex == 1) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'], // 指定来源为相机
            success: (res) => {
              const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              // changeInfo({ ...doctorInfo, icon: localIds });
              this.wxuploadImage(localIds, key);
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
          <img src={require('images/last.jpg')} alt="" />
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
            <img src={require('images/img.png')} onClick={() => this.showActionSheet('idIcon')} />
            <img src={require('images/ex1.png')} className="exampleImg" alt="" />
            <span>请上传身份证的正面照片</span>
          </div>
        </div>
        <div className="practice borderTop">
          <p>医师执业证</p>
          <div className="photohere">
            <img src={require('images/img.png')} onClick={() => this.showActionSheet('jobIcon1')} />
            <img src={require('images/ex2.png')} className="exampleImg" alt="" />
            <span>请上传医师执业证的第1页</span>
          </div>
          <div className="photohere">
            <img src={require('images/img.png')} onClick={() => this.showActionSheet('jobIcon2')} />
            <img src={require('images/ex3.png')} className="exampleImg" alt="" />
            <span>请上传医师执业证的第2页</span>
          </div>
        </div>
        <div className="seniority borderBottom borderTop">
          <p>医师资格证</p>
          <div className="photohere">
            <img src={require('images/img.png')} onClick={() => this.showActionSheet('doctorIcon')} />
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
