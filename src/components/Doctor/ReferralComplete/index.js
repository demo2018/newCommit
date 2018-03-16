import { Steps } from 'antd-mobile';
import styles from './index.less';
import StepHead from './StepHead';

const Step = Steps.Step;
const customIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-xs">
    <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
      <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
      {/* <path fill="#FFF" d="M29 18.73c0-.55-.447-1-1-1H23.36l4.428-5.05c.407-.46.407-1.208 0-1.668-.407-.46-1.068-.46-1.476 0l-5.21 5.89-5.21-5.89c-.406-.46-1.067-.46-1.475 0-.406.46-.406 1.207 0 1.667l4.43 5.05H14.23c-.55 0-.998.45-.998 1 0 .554.448.97 1 .97h5.9v3.942h-5.9c-.552 0-1 .448-1 1s.448.985 1 .985h5.9v4.896c0 .552.448 1 1 1 .55 0 .968-.284.968-.836v-5.06H28c.553 0 1-.433 1-.985s-.447-1-1-1h-5.9v-3.94H28c.553 0 1-.418 1-.97z" /> */}
    </g>
  </svg>
);

class ReservationProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '已完成',
    };
    document.title = this.state.title;
  }
  render() {
    return (
      <div className={styles.reservationProcess}>
        <StepHead />
        <Steps className="borderBottom borderTop" size="small">
          <Step
            status="finish"
            icon={customIcon()}
            title={<p>本单收入:<span className="finialIncome">￥207.45</span>已到账，可在我的钱包中提现</p>}
            description={<p><span className="date">2017/03/09</span><span className="time">10:25</span></p>}
          />
          <Step
            status="wait"
            icon={customIcon()}
            title="已支付账单金额￥2074.50"
            description={<p><span className="date">2017/03/09</span><span className="time">10:25</span></p>}
          />
          <Step
            status="wait"
            icon={customIcon()}
            title={<p>已完成拔牙、洗牙项目，账单金额￥2074.50，点击 <span className="checkDetail">查看详情</span></p>}
            description={<p><span className="date">2017/03/09</span><span className="time">10:25</span></p>}
          />
          <Step
            status="wait"
            icon={customIcon()}
            title="已预约南哲医生，2017年3月17日治疗洗牙项目"
            description={<p><span className="date">2017/03/09</span><span className="time">10:25</span></p>}
          />
          <Step
            status="wait"
            icon={customIcon()}
            title="注册"
            description={<p><span className="date">2017/03/09</span><span className="time">10:25</span></p>}
          />
          <Step
            status="wait"
            icon={customIcon()}
            title="咨询中"
            description={<p><span className="date">2017/03/09</span><span className="time">10:25</span></p>}
          />
          <Step
            status="wait"
            icon={customIcon()}
            title="已关注薄荷牙医微信公众号"
            description={<p><span className="date">2017/03/09</span><span className="time">10:25</span></p>}
          />
          <Step
            status="wait"
            icon={customIcon()}
            title="扫码完成"
            description={<p><span className="date">2017/03/09</span><span className="time">10:25</span></p>}
          />
        </Steps>
        <p className="contactService">这一单有问题？联系客服（400）</p>
      </div>
    );
  }
}

export default ReservationProcess;
