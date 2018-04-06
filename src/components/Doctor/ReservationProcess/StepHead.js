import { getServer } from 'utils/common';

class StepHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { details } = this.props;
    const { medical } = getServer();
    return (
      <div className="stepHead borderBottom">
        <img src={`${medical}/bhyy/core/image/${details.icon}`} alt="" />
        <p>
          <span className="customerName">{details.customerName}</span>
          {details.status == 0 && <span className="state">已扫码</span>}
          {details.status == 1 && <span className="state">咨询中</span>}
          {details.status == 2 && <span className="state">已注册</span>}
          {details.status == 3 && <span className="state">已预约</span>}
          {details.status == 4 && <span className="state">已就诊</span>}
          {details.status == 5 && <span className="state">未支付</span>}
          {details.status == 6 && <span className="state">已完成</span>}
          {details.status == 7 && <span className="state">取消预约</span>}
        </p>
      </div>
    );
  }
}

export default StepHead;
