import { Button } from 'antd-mobile';
import styles from './index.less';
import { numToLocaleString } from 'utils/common';

class MyWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我的钱包',
    };
    document.title = this.state.title;
  }
  render() {
    const { toWallet, details } = this.props;
    return (
      <div className={styles.myWallet}>
        <div className="walletHead">
          账户（元）
          <p className="money">{numToLocaleString(details.balance)}</p>
        </div>
        <Button className="checkDetail" onClick={toWallet}>查看明细</Button>
      </div>
    );
  }
}

export default MyWallet;
