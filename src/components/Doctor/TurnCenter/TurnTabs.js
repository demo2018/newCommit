import { List, Tabs } from 'antd-mobile';
import styles from './index.less';
import DropDownPicker from 'components/Common/DropDownPicker';
import Turning from './Turning';
import TurnSuccess from './TurnSuccess';

const tabs = [
  { index: 0, name: 'test1', title: '已预约（2）', },
  { index: 1, name: 'test2', title: '转诊成功（5）', },
];

const dataSourse = {
  test1: [
  { label: '全部状态', value: 1 },
  { label: '已扫码', value: 2 },
  { label: '已登录', value: 3 },
  { label: '咨询中', value: 4 },
  { label: '已预约', value: 5 },
  { label: '取消预约', value: 6 },
  ]
};


class TurnTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
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
      value: ['5'],
      menus: dataSourse[name],
      onSelect: (item) => {
        console.log(item);
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

  render() {
    const { activeTab } = this.state;
    const { toDet, toSuccess } = this.props;
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
            <div style={{ display: 'block', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
              <Turning toDet={toDet} />
            </div>
            <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
              <TurnSuccess toSuccess={toSuccess} />
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default TurnTabs;
