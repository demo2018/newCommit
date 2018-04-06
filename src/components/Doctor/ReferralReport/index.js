import { List } from 'antd-mobile';
import styles from './index.less';
import { formatDate, getServer } from 'utils/common';

const ListItem = List.Item;
const Brief = ListItem.Brief;

class ReferralReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '转诊报告',
    };
    document.title = this.state.title;
  }
  renderList() {
    const { referraling } = this.props;
    const { medical } = getServer();
    return (referraling.content || []).map(({ status, operationTime, id, icon, customerName }) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        thumb={`${medical}/bhyy/core/image/${icon}`}
        multipleLine
        extra={status == 0 && <span className="state">已扫码</span>
          || status == 1 && <span className="state">咨询中</span>
          || status == 2 && <span className="state">已注册</span>
          || status == 3 && <span className="state">已预约</span>
          || status == 4 && <span className="state">已就诊</span>
          || status == 5 && <span className="state">未支付</span>
          || status == 7 && <span className="turnStatu">取消预约</span>
         }
      >
        <span className="customerName">{customerName}</span>
        <Brief><span className="date">{formatDate(operationTime)}</span></Brief>
      </ListItem>);
    })
      ;
  }
  renderSuccessList() {
    const { referralSuccess } = this.props;
    return (referralSuccess.content || []).map(({ status, operationTime, id, num }) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        thumb={require('assets/head.png')}
        multipleLine
        extra={status == 6 && <span className="state">+{num}</span>}
      >
        <span className="customerName">柴杰秀</span>
        <Brief>{formatDate(operationTime)}</Brief>
      </ListItem>);
    })
      ;
  }
  render() {
    const { referraling, referralSuccess } = this.props;
    return (
      <div className={styles.referralReport}>
        <div className="reportHead">
          <p>报告时间：2017/10/02-2017/10/08</p>
        </div>
        <div className="referralContent">
          <p className="borderTop referralState">
            转诊中
            {
              referraling.content && referraling.content[0]
                ? <span>（{referraling.totalElements}）</span>
                : null
            }
          </p>
          {
            referraling.content && referraling.content[0]
              ? <List>{this.renderList()}</List>
              : <div className="noReferral">暂无转诊记录</div>
          }
          <p className="borderTop referralState">
            转诊成功
              {
              referralSuccess.content && referralSuccess.content[0]
                ? <span>
                  <span>（{referralSuccess.totalElements}）</span>
                  <span className="totalIn">共收入：3333.00</span>
                </span>
                : null
            }
          </p>
          {
            referralSuccess.content && referralSuccess.content[0]
              ? <List>{this.renderSuccessList()}</List>
              : <div className="noReferral">暂无转诊记录</div>
            }
        </div>
      </div>
    );
  }
}

export default ReferralReport;
