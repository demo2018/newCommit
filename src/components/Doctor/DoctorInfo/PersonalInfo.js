import { List, Picker, DatePicker, InputItem, Toast, ActionSheet } from 'antd-mobile';
import head from 'assets/head.png';


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

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: data,
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
  }
  // componentDidMount() {
  // }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ doctorInfo: getDetailByStates(nextProps.details) });
    }
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
            sourceType: ['album'], // 指定来源为相册
            success: function (res) {
              console.log('hah');
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
    return (
      <div className="personalInfo">
        {/* 个人资料 */}
        <List className="my-list">
          <ListItem className="my-listhead borderBottom">个人资料</ListItem>
          {/* 头像选择 */}
          <ListItem
            arrow="horizontal"
            extra={myImg(head)}
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
