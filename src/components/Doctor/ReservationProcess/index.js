import { Steps, Modal } from 'antd-mobile';
import styles from './index.less';
import StepHead from './StepHead';
import { formatDate } from 'utils/common';

const Step = Steps.Step;

const customIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-xs">
    <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
      <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
    </g>
  </svg>
);

class ReservationProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '详情',
    };
    document.title = this.state.title;
    this.phone = this.phone.bind(this);
  }
  // 联系客服
  phone() {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    if (isAndroid) {
      Modal.alert('提示', '确定拨打电话：400-9696-791吗？', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => (window.location.href = 'tel://400-9696-791') },
      ]);
    }
    if (isiOS) {
      window.location.href = 'tel://400-9696-791';
    }
  }
  renderSteps() {
    const { details } = this.props;
    return (details.logs || []).map(({ content, createTime, id }) => {
      if (id == details.logs[0].id) {
        return (<Step
          key={id}
          status="finish"
          icon={customIcon()}
          title={content}
          description={<p><span className="date">{formatDate(createTime)}</span></p>}
        />);
      }
      return (<Step
        key={id}
        status="wait"
        icon={customIcon()}
        title={content}
        description={<p><span className="date">{formatDate(createTime)}</span></p>}
      />);
    });
  }

  render() {
    const { details } = this.props;
    const detailsProps = { details };
    return (
      <div className={styles.reservationProcess}>
        <StepHead {...detailsProps} />
        <Steps className="borderBottom borderTop" size="small">
          {this.renderSteps()}
        </Steps>
        {
          details.status == 6
            ? <p className="contactService" onClick={this.phone}>这一单有问题？联系客服（400）</p>
            : <p className="contactService" onClick={this.phone}>联系客服维护患者</p>
        }
      </div>
    );
  }
}

export default ReservationProcess;
