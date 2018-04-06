
import { List, Picker, DatePicker, InputItem, ActionSheet } from 'antd-mobile';
import styles from './index.less';
import CustomerRelation from './CustomerRelation';

const ListItem = List.Item;
const minDate = new Date(1960, 0, 1);
const maxDate = new Date();
const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}];
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
class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '个人信息',
      files: data,
      hasError: false,
      sex: [
        {
          label: '女',
          value: 0,
        },
        {
          label: '男',
          value: 1,
        },
      ],
      cols: 1,
      gender: [],
      userInfo: getDetailByStates(props.details),
    };
    document.title = this.state.title;
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ userInfo: getDetailByStates(nextProps.details) });
    }
  }
  // 切换下拉框值
  handleChange(key) {
    return (value) => {
      const { changeInfo } = this.props;
      const { userInfo } = this.state;
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ userInfo: { ...userInfo, [key]: value } });
      if (key == 'gender') {
        changeInfo({ ...userInfo, gender: value[0], birthday: userInfo.birthday ? userInfo.birthday.getTime() : null });
      } else if (key == 'birthday') {
        changeInfo({ ...userInfo, gender: userInfo.gender[0], birthday: value ? value.getTime() : null });
      } else {
        changeInfo({ ...userInfo, gender: userInfo.gender[0], birthday: userInfo.birthday ? userInfo.birthday.getTime() : null });
      }
    };
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
  showActionSheet = () => {
    const { wechat } = this.props;
    const BUTTONS = ['拍照', '我的相册', '取消'];
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
            sourceType: ['camera'], // 指定来源为相机
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
        if (buttonIndex == 1) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album'], // 指定来源为相册
            success: (res) => {
              const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              // changeInfo({ ...doctorInfo, icon: localIds });
              this.wxuploadImage(localIds);
            }
          });
        }
      });
  }
  render() {
    const { toAddRelation, toUserName, datas, toUpdateRelation } = this.props;
    const { userInfo } = this.state;
    const relationProps = {
      datas
    };
    return (
      <div className={styles.userInformation}>
        <List className="my-list">
          <ListItem className="my-listhead borderBottom">个人资料</ListItem>
          {/* 头像选择 */}
          <ListItem
            arrow="horizontal"
            onClick={this.showActionSheet}
            extra={myImg(userInfo.icon)}
            className="headImg borderBottom"
          >头像</ListItem>
          <ListItem className="borderBottom" extra={<span className="customerName">{userInfo.realName}</span>} arrow="horizontal" onClick={toUserName}>姓名</ListItem>
          {/* 性别 */}
          <Picker
            data={this.state.sex}
            cols={this.state.cols}
            value={userInfo.gender}
            onChange={this.handleChange('gender')}
          >
            <List.Item className="borderBottom" arrow="horizontal" onClick={this.onClick}>性别</List.Item>
          </Picker>
          {/* 输入手机号码 */}
          <InputItem
            className="borderBottom"
            type="phone"
            value={userInfo.phone ? userInfo.phone.replace(/^(...)(....)/g, '$1 $2 ') : null}
            editable={false}
            onChange={this.handleChange('phone')}
          >手机号码</InputItem>
          {/* 选择出生日期 */}
          <DatePicker
            mode="date"
            extra="请选择出生日期"
            value={userInfo.birthday}
            defaultValue={new Date(1980, 0, 1)}
            minDate={minDate}
            maxDate={maxDate}
            onChange={this.handleChange('birthday')}
          >
            <List.Item className="borderBottom" arrow="horizontal">出生日期</List.Item>
          </DatePicker>
        </List>
        <CustomerRelation toAddRelation={toAddRelation} toUpdateRelation={toUpdateRelation} {...relationProps} />
      </div>
    );
  }
}

export default UserInfo;
