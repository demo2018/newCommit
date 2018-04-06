import { List, Tabs } from 'antd-mobile';
import styles from './index.less';
import DropDownPicker from 'components/Common/DropDownPicker';
import { formatDate, getServer } from 'utils/common';

const ListItem = List.Item;
const Brief = ListItem.Brief;

const tabs = [
  { index: 0, name: 'referraling', title: '转诊中', },
  { index: 1, name: 'referralsuccess', title: '转诊成功', },
];

const dataSourse = {
  referraling: [
  { label: '全部状态', value: -1 },
  { label: '已扫码', value: 0 },
  { label: '已注册', value: 2 },
  { label: '咨询中', value: 1 },
  { label: '已预约', value: 3 },
  { label: '取消预约', value: 6 },
  ]
};


class TurnTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      statusNum: [0, 1, 2, 3, 4, 5, 7],
    };
    this.handleTabClick = this.handleTabClick.bind(this);
    this.renderTabheader = this.renderTabheader.bind(this);
  }

  handleTabClick(TabData, index) {
    this.setState({ activeTab: index });
  }
  renderTabheader({ name, title, index }) {
    const { activeTab } = this.state;
    const pickerProps = {
      title,
      multiple: false,
      menus: dataSourse[name],
      onSelect: (item) => {
        if (item && item[0]) {
          if (item[0] == -1) {
            this.setState({ statusNum: [0, 1, 2, 3, 4, 5, 7] });
          } else {
            this.setState({ statusNum: item[0] });
          }
        }
      },
      onVisibleChange: (visible) => {
        if (activeTab === index) {
          if (activeTab === 1) {
            return false;
          }
          return visible;
        }
        return false;
      }
    };
    return <DropDownPicker {...pickerProps} />;
  }
   //  转诊中列表
  renderReferralingList() {
    const { referraling, toDet } = this.props;
    const { medical } = getServer();
    const { statusNum } = this.state;
    return (referraling.content || [])
      .filter(({ status }) => {
        return statusNum.includes(status) || statusNum.includes(`${status}`);
      })
      .map(({ operationTime, id, status, icon, customerName }) => {
        return (
          <ListItem
            className="borderBottom"
            key={id}
            arrow="horizontal"
            thumb={`${medical}/bhyy/core/image/${icon}`}
            multipleLine
            onClick={() => { toDet(id); }}
            extra={status == 0 && <span className="turnStatu">已扫码</span>
              || status == 1 && <span className="turnStatu">咨询中</span>
              || status == 2 && <span className="turnStatu">已注册</span>
              || status == 3 && <span className="turnStatu">已预约</span>
              || status == 4 && <span className="turnStatu">已就诊</span>
              || status == 5 && <span className="turnStatu">未支付</span>
              || status == 7 && <span className="turnStatu">取消预约</span>
            }
          >
            <span className="customerName">{customerName}</span>
            <Brief>{formatDate(operationTime)}</Brief>
          </ListItem>
        );
      });
  }
   //  转诊成功列表
  renderReferralSuccessList() {
    const { referralSuccess, toDet } = this.props;
    const { medical } = getServer();
    return (referralSuccess.content || []).map(({ status, operationTime, id, money, icon, customerName }) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        arrow="horizontal"
        thumb={`${medical}/bhyy/core/image/${icon}`}
        multipleLine
        onClick={() => { toDet(id); }}
        extra={status == 6 && <span className="finalIn">+￥{money}</span>}
      >
        <span className="customerName">{customerName}</span>
        <Brief>{formatDate(operationTime)}</Brief>
      </ListItem>);
    })
      ;
  }
  render() {
    const { activeTab } = this.state;
    const { referraling, referralSuccess } = this.props;
    return (
      <div className={styles.turnTabs}>
        <div className="borderTop wrap">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            initialPage={0}
            renderTab={this.renderTabheader}
            onTabClick={this.handleTabClick}
          >
            <div style={{ display: 'block', alignItems: 'center', justifyContent: 'center' }}>
              {
                referraling.content && referraling.content[0]
                  ? <List>{this.renderReferralingList()}</List>
                  : <div className="noReferral">暂无转诊记录</div>
              }
            </div>
            <div style={{ alignItems: 'center', justifyContent: 'center' }}>
              {
                referralSuccess.content && referralSuccess.content[0]
                  ? <List>{this.renderReferralSuccessList()}</List>
                  : <div className="noReferral">暂无转诊记录</div>
              }
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default TurnTabs;
