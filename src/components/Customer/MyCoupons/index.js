import { Tabs } from 'antd-mobile';
import styles from './index.less';
import NoCoupons from './NoCoupons';


const tabs = [
  { title: '未使用' },
  { title: '已使用' },
  { title: '已过期' },
];


class Evaluate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我的优惠券',
      height: document.documentElement.clientHeight,
    };
    document.title = this.state.title;
  }
  render() {
    const { toCouponsInstruction } = this.props;
    return (
      <div className={styles.myCoupons} style={{ height: this.state.height }}>
        <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false} swipeable={false}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ul>
              <li><img src={require('../../../assets/ticket.png')} alt="优惠券" /></li>
              <li><img src={require('../../../assets/ticket.png')} alt="优惠券" /></li>
            </ul>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NoCoupons />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NoCoupons />
          </div>
        </Tabs>
        <p className="coupons-instructions" onClick={toCouponsInstruction}>优惠券说明</p>
      </div>
    );
  }
}

export default Evaluate;
