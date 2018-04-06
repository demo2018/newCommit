import { InputItem, Button, Toast, List } from 'antd-mobile';
import styles from './index.less';
import cookie from 'js-cookie';

const SECOND = 60;

class ChangePhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '更换手机号',
      isCaptchaSend: false,
      second: SECOND,
      phone: '',
      code: '',
    };
    this.handleGetCode = this.handleGetCode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    document.title = this.state.title;
  }
  componentWillUnmount() {
    clearInterval(this.codeTimer);
  }
  startCodeTimer() {
    this.setState({
      isCaptchaSend: true,
      second: SECOND
    });
    this.codeTimer = setInterval(() => {
      let { second } = this.state;
      let isCaptchaSend = false;
      second -= 1;
      if (second < 1) {
        clearInterval(this.codeTimer);
        second = SECOND;
        isCaptchaSend = false;
      } else {
        isCaptchaSend = true;
      }
      this.setState({
        isCaptchaSend,
        second
      });
    }, 1000);
  }
  handleGetCode() {
    const { phone } = this.state;
    const { changeCode } = this.props;
    const Rex = /^1[3|4|5|7|8]\d{1}\s\d{4}\s\d{4}$/;
    if (!phone) {
      Toast.info('手机号不能为空', 1.5);
    } else if (!Rex.test(phone)) {
      Toast.info('手机号格式有误', 1.5);
    } else {
      this.startCodeTimer();
      changeCode(phone);
      Toast.info('验证码已发送', 1.5);
    }
  }
  handleChange(key) {
    return (value) => {
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ [key]: value });
    };
  }
  handleSubmit() {
    const { changePhone } = this.props;
    const { phone, code } = this.state;
    const formData = { phone, code };
    if (!phone) {
      Toast.info('请输入手机号', 1);
    }
    if (!code) {
      Toast.info('请输入验证码', 1);
    }
    changePhone(formData);
  }
  renderCodeBtn() {
    const { isCaptchaSend, second } = this.state;
    return !isCaptchaSend
      ? <a onClick={this.handleGetCode}>发送验证码</a>
      : <span>{second}秒后再次获取</span>;
  }
  render() {
    const formData = this.state;
    return (
      <div className={styles.changePhone}>
        <p className="changeTips">提示：更换新手机号后，老手机号码将不能用于登录和接收预约信息。当前手机号：<span className="phoneNow">{cookie.get('phone')}</span></p>
        <List>
          <InputItem
            type="phone"
            placeholder="请输入"
            value={formData.phone}
            onChange={this.handleChange('phone')}
          >新手机号：</InputItem>
          <InputItem
            type="number"
            placeholder="请输入"
            value={formData.code}
            onChange={this.handleChange('code')}
            extra={this.renderCodeBtn()}
          >验证码：</InputItem>
        </List>
        <div className="changeSubmit">
          <Button
            type="primary"
            onClick={this.handleSubmit}
          >确定</Button>
        </div>
      </div>
    );
  }
}

export default ChangePhone;
