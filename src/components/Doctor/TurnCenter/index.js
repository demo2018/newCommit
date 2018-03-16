import TurnTabs from './TurnTabs';
import styles from './index.less';


class TurnCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '转诊中心',
    };
    document.title = this.state.title;
  }
  render() {
    const { toDet, toSuccess } = this.props;
    return (
      <div className={styles.turnCenter}>
        <div className="head borderBottom">
          累计奖励（元）：
          <p className="money">6039.00</p>
        </div>
        <TurnTabs toSuccess={toSuccess} toDet={toDet} />
      </div>
    );
  }
}

export default TurnCenter;
