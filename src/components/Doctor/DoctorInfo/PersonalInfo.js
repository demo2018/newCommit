import { List, Picker, DatePicker, InputItem, Toast, ActionSheet } from 'antd-mobile';
import { getServer, getUploadPicUrl } from 'utils/common';


const ListItem = List.Item;
const minDate = new Date(1960, 0, 1);
const maxDate = new Date();

const myImg = src => <img src={src} alt="" />;

// 格式化获取到的性别及出生日期
const getDetailByStates = (details = {}) => {
  const { birthday, gender } = details;
  return {
    ...details,
    gender: [gender], // picker组件接受的是数组
    birthday: birthday ? new Date(birthday) : undefined, // mobile日期组件只支持传入date对象
  };
};

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      gender: [
        {
          label: '女',
          value: 0,
        },
        {
          label: '男',
          value: 1,
        },
      ],
      doctorInfo: getDetailByStates(props.details),
    };
    this.wxuploadImage = this.wxuploadImage.bind(this);
    // this.wxImgDown = this.wxImgDown.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ doctorInfo: getDetailByStates(nextProps.details) });
    }
  }
  // 上传图片接口
  wxuploadImage = (e) => {
    const { imgUpload } = this.props;
    wx.uploadImage({
      localId: e, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: (res) => {
        const mediaId = res.serverId; // 返回图片的服务器端ID
        alert(mediaId);
        // if (mediaId) {.
          // 回传servsrId给后台
        imgUpload(mediaId);

        // this.wxImgDown(mediaId);
        // }
      },
      // fail: function (error) {
      //   picPath = '';
      //   localIds = '';
      //   alert(Json.stringify(error));
      // }
    });
  }
  // 下载图片接口
  // wxImgDown = (sid) => {
  //   const { changeInfo, imgUpload } = this.props;
  //   const { doctorInfo } = this.state;
  //   wx.downloadImage({
  //     serverId: sid, // 需要下载的图片的服务器端ID，由uploadImage接口获得
  //     success: (res) => {
  //       const localId = res.localId; // 返回图片下载后的本地ID
  //       // changeInfo({ ...doctorInfo, icon: getUploadPicUrl(localId) });
  //     }
  //   });
  // }
  showActionSheet = () => {
    const BUTTONS = ['从相册选择图片', '拍照', '取消'];
    const { wechat, changeInfo } = this.props;
    const { doctorInfo } = this.state;

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
      // 点击按钮调用微信相册和相机接口
      (buttonIndex) => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
        if (buttonIndex == 0) {   //  调用相册
          wx.chooseImage({
            count: 1, //  可选择照片的数量
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], // 指定来源为相册
            success: (res) => {
              const localIds = res.localIds[0].toString();
              alert(localIds);
              // const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              // changeInfo({ ...doctorInfo, icon: getBase64(localIds) });
              this.wxuploadImage(localIds);

              // getUploadPicUrl({ type: 'icon' });
              // changeInfo({ ...doctorInfo, icon: localId });
            }
          });
        }
        if (buttonIndex == 1) {   // 调用相机
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'], // 指定来源为相机
            success: (res) => {
              const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              // changeInfo({ ...doctorInfo, icon: localIds });
               this.wxuploadImage(localIds);
            }
          });
        }
      });
  }
  handleChange(key) {
    return (value) => {
      const { changeInfo } = this.props;
      const { doctorInfo } = this.state;
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ doctorInfo: { ...doctorInfo, [key]: value } });
      if (key == 'gender') {
        changeInfo({ ...doctorInfo, gender: value[0], birthday: doctorInfo.birthday ? doctorInfo.birthday.getTime() : null });
      } else if (key == 'birthday') {
        changeInfo({ ...doctorInfo, gender: doctorInfo.gender[0], birthday: value ? value.getTime() : null });
      } else {
        changeInfo({ ...doctorInfo, gender: doctorInfo.gender[0], birthday: doctorInfo.birthday ? doctorInfo.birthday.getTime() : null });
      }
    };
  }
  render() {
    const { toDoctorName } = this.props;
    const { doctorInfo } = this.state;
    const { medical } = getServer();
    return (
      <div className="personalInfo">
        {/* 个人资料 */}
        <List className="my-list">
          <ListItem className="my-listhead borderBottom">个人资料</ListItem>
          {/* 头像选择 */}
          <ListItem
            arrow="horizontal"
            extra={myImg(`${medical}/bhyy/core/image/${doctorInfo.icon}`)}
            className="headImg borderBottom" onClick={this.showActionSheet}
          >头像</ListItem>
          <ListItem className="borderBottom" extra={doctorInfo.realName} arrow="horizontal" onClick={toDoctorName}>姓名</ListItem>
          {/* 性别 */}
          <Picker
            data={this.state.gender}
            cols={1}
            value={doctorInfo.gender}
            onChange={this.handleChange('gender')}
          >
            <List.Item className="borderBottom" arrow="horizontal" onClick={this.onClick}>性别</List.Item>
          </Picker>
          {/* 输入手机号码 */}
          <InputItem
            className="borderBottom"
            type="phone"
            value={doctorInfo.phone ? doctorInfo.phone.replace(/^(...)(....)/g, '$1 $2 ') : null}
            editable={false}
            onChange={this.handleChange('phone')}
          >手机号码</InputItem>
          {/* 选择出生日期 */}
          <DatePicker
            mode="date"
            extra="请选择出生日期"
            value={doctorInfo.birthday}
            minDate={minDate}
            maxDate={maxDate}
            onChange={this.handleChange('birthday')}
          >
            <List.Item className="borderBottom" arrow="horizontal">出生日期</List.Item>
          </DatePicker>
        </List>
      </div>
    );
  }
}

export default PersonalInfo;
