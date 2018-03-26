import { List, InputItem, DatePicker, Button, Radio, ActionSheet, Steps } from 'antd-mobile';
import styles from './index.less';

const Step = Steps.Step;
const steps = [{
  title: '基本信息',
}, {
  title: '执业信息',
}, {
  title: '资格认证',
}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);

const minDate = new Date(1960, 0, 1);
const maxDate = new Date();
const RadioItem = Radio.RadioItem;
const getDetailByStates = (details = {}) => {
  const { birthday } = details;
  return {
    ...details,
    birthday: birthday ? new Date(birthday) : undefined,
  };
};
const data = [
  { value: 0, label: '男' },
  { value: 1, label: '女' },
];


class DoctorBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '医生认证',
      doctorInfo: getDetailByStates(props.details),
    };
    document.title = this.state.title;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ doctorInfo: getDetailByStates(nextProps.details) });
    }
  }

  //  性别单选
  onChange = (value) => {
    const { doctorInfo } = this.state;
    this.setState({ doctorInfo: { ...doctorInfo, gender: value }});
  };
  showActionSheet = () => {
    const BUTTONS = ['从相册选择图片', '拍照', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      maskClosable: true,
    },
      // 点击按钮回调
      (buttonIndex) => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      });
  }
  handleChange(key) {
    return (value) => {
      const { doctorInfo } = this.state;
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ doctorInfo: { ...doctorInfo, [key]: value } });
    };
  }
  handleSubmit() {
    const { toProfessional, changeInfo } = this.props;
    const { doctorInfo } = this.state;
    const { birthday } = doctorInfo;
    changeInfo({ ...doctorInfo, birthday: birthday ? birthday.getTime() : null });
    toProfessional();
  }
  render() {
    const { doctorInfo } = this.state;
    console.log(doctorInfo.gender)
    return (
      <div className={styles.doctorCertification}>
        <div className="head borderBottom">
             <img src={require('images/basichead.jpg')} alt="" />  
           {/* <Steps current={1} direction="horizontal">{steps}</Steps>  */}
        </div>
        <div className="uploadImg borderBottom borderTop">
          <p>头像</p>
          <div className="photohere">
            <img src={require('images/img.png')} onClick={this.showActionSheet} />
            <span>请上传清晰、正面、人像照片</span>
					</div>
        </div>

        <div className="basicInfo">
          <p>基本信息</p>
          <List>
            <InputItem
              placeholder="请输入"
              value={doctorInfo.realName}
              onChange={this.handleChange('realName')}
            >真实姓名</InputItem>
            {/* 单选 */}
            <div className="gender-choose borderBottom">
              <em>性别</em>
              {data.map(i => (
                <RadioItem key={i.value} checked={doctorInfo.gender === i.value} onChange={() => this.onChange(i.value)}>
                  {i.label}
                </RadioItem>
              ))}
            </div>
            <DatePicker
              mode="date"
              placeholder="请选择"
              value={doctorInfo.birthday}
              minDate={minDate}
              maxDate={maxDate}
              onChange={this.handleChange('birthday')}
            >
              <List.Item>出生日期</List.Item>
            </DatePicker>
          </List>
        </div>

        <Button type="primary" onClick={this.handleSubmit}>下一步</Button>
      </div>
    );
  }
}

export default DoctorBasic;
