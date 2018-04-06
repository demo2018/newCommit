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
    const { toDet, toSuccess, toReport, referraling, referralSuccess } = this.props;
    const referralProps = { referraling, referralSuccess };
    return (
      <div className={styles.turnCenter}>
        <div className="head borderBottom">
          累计奖励（元）：
          <p className="money">0.00</p>
          <img src={require('images/new.png')} onClick={toReport} />
        </div>
        <TurnTabs toSuccess={toSuccess} toDet={toDet} {...referralProps} />
      </div>
    );
  }
}

export default TurnCenter;
