import { Result } from 'antd-mobile';
import styles from './index.less';


const SECOND = 3;

class AppointResult extends React.Component {
  constructor(props) {
    super(props);
    this.codeTimer = null;
    this.state = {
      second: SECOND,
    };
  }
  //  返回预约结果，三秒后跳至预约结果页
  componentDidMount() {
    const { toMyAppoint } = this.props;
    this.codeTimer = setInterval(() => {
      let { second } = this.state;
      this.setState({ second: second -= 1 });
      if (second < 1) {
        clearInterval(this.codeTimer);
        toMyAppoint();
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.codeTimer);   // 在倒计时被销毁前清除计时器
  }
  render() {
    const { second } = this.state;
    const status = localStorage.getItem('resultStatus');
    return (
      <div className={styles.appointResult}>
        {
          !status
            ? <Result
              img={<img src={require('images/defeat.png')} />}
              title={<span>预约失败（{second}）</span>}
              message="预约失败，请您重新预约！"
            />
            : <Result
              img={<img src={require('images/success-info.png')} />}
              title={<span>预约成功（{second}）</span>}
              message="请等待您的私人医生助理联系您！"
            />
        }
      </div>
    );
  }
}

export default AppointResult;

