
import { List, Picker, DatePicker, InputItem, ActionSheet } from 'antd-mobile';
import styles from './index.less';
import CustomerRelation from './CustomerRelation';
import { toString } from 'utils/common';

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
  console.log(typeof(gender));
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
  showActionSheet = () => {
    const { wechat } = this.props;
    console.log(wechat);
    const BUTTONS = ['拍照', '我的相册', '取消'];
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
