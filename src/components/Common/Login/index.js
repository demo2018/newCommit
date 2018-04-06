import { NoticeBar, Tabs, Checkbox, InputItem, Button, Toast } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
import styles from './index.less';
import logoPng from 'images/loginLogo.png';

const SECOND = 60;
// 格式化手机号
const getDetailByStates = (phone) => {
  return { phone: phone.replace(/\s*/g, '') };
};


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.codeTimer = null;
    this.state = {
      title: '登录',
      activeTab: 0,
      btnStatus: true,
      isCaptchaSend: false,
      second: SECOND,
      phone: localStorage.getItem('phone') ? localStorage.getItem('phone').replace(/^(...)(....)/g, '$1 $2 ') : '',
      code: '',
      height: document.documentElement.clientHeight,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleGetCode = this.handleGetCode.bind(this);
    document.title = this.state.title;
  }
  //  验证码输入框兼容苹果安卓端唤起数字键盘
  componentWillMount() {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    if (isAndroid) {
      this.setState({ type: 'digit', });
    }
    if (isiOS) {
      this.setState({ type: 'number', });
    }
  }
  componentWillUnmount() {
    clearInterval(this.codeTimer);   // 在倒计时被销毁前清除计时器
  }
  // 验证码倒计时
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
  // 根据选中的Tab卡判断是医生或者患者登陆
  handleLogin() {
    const { customerLogin, doctorLogin } = this.props;
    const formData = this.state;
    if (!formData.phone) {
      Toast.info('请输入手机号', 1);
    } else if (!formData.code) {
      Toast.info('请输入验证码', 1);
    } else {
      if (formData.activeTab == 0) {
        localStorage.removeItem('phone');
        localStorage.removeItem('code');
        customerLogin(formData);
      }
      if (formData.activeTab == 1) {
        localStorage.removeItem('phone');
        localStorage.removeItem('code');
        doctorLogin(formData);
      }
    }
  }
  // 获取验证码时触发：验证手机号，判断获取人为医生还是患者
  handleGetCode() {
    const { customerLoginCode, doctorLoginCode } = this.props;
    const { phone, activeTab } = this.state;
    const formatPhone = getDetailByStates(phone);
    const reg = /^1[3|4|5|7|8]\d{1}\s\d{4}\s\d{4}$/;
    if (!phone) {
      Toast.info('手机号不能为空', 1);
    } else if (!reg.test(phone)) {
      Toast.info('手机号格式有误', 1);
    } else {
      Toast.info('验证码已发送', 1);
      this.startCodeTimer();
      if (activeTab && activeTab == 1) {
        doctorLoginCode(formatPhone);
      } else {
        customerLoginCode(formatPhone);
      }
    }
  }
  handleChange(key) {
    return (value) => {
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ [key]: value });
      localStorage.setItem([key], value.replace(/\s*/g, ''));
    };
  }
  handleCheckBoxChange(key) {
    return (value) => {
      if (value.target) {
        value = value.target.checked;
        this.setState({ [key]: value });
      }
    };
  }
  // 发送验证码
  renderCodeBtn() {
    const { isCaptchaSend, second } = this.state;
    return !isCaptchaSend
      ? <a onClick={this.handleGetCode}>发送验证码</a>
      : <span>{second}秒后再次获取</span>;
  }
  render() {
    const formData = this.state;
    const { toProtectPrivacy } = this.props;
    const tabsProps = {
      activeTab: formData.activeTab,
      tabs: [
        { key: 'user', title: '我是患者' },
        { key: 'doctor', title: '我是三甲医生' },
      ],
      onTabClick: (tab, index) => {
        this.setState({ activeTab: index });
      },
    };
    return (
      <div className={styles.loginPage} style={{ height: this.state.height, backgroundColor: '#fff' }}>
        <NoticeBar
          mode="closable"
          marqueeProps={{ loop: true, leading: 0, trailing: 1000, fps: 60 }}
        >薄荷牙医目前只接受三甲医院的医生入驻哦 !
        </NoticeBar>

        <div className="logoWrapper">
          <img src={logoPng} alt="图片加载失败" />
        </div>

        <div className="formWrapper">
          <Tabs {...tabsProps} />

          <InputItem
            type="phone"
            placeholder="请输入"
            value={formData.phone}
            onChange={this.handleChange('phone')}
            extra={this.renderCodeBtn()}
          >手机号码</InputItem>
          <InputItem
            type={this.state.type}
            placeholder="请输入"
            value={formData.code}
            onChange={this.handleChange('code')}
          >验证码</InputItem>

          <Button
            className="loginBtn"
            type="primary"
            onClick={this.handleLogin}
            disabled={!formData.btnStatus}
          >登录</Button>

          <CheckboxItem
            size="small"
            defaultChecked
            onChange={this.handleCheckBoxChange('btnStatus')}
          >
            阅读并同意<a className="agreement" onClick={toProtectPrivacy}> 隐私服务条款</a>
          </CheckboxItem>
        </div>

      </div >
    );
  }
}

export default Login;
