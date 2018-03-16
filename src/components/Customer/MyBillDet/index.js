import styles from './index.less';
import MyBillDetHead from './MyBillDetHead';
import BillDetail from './BillDetail';
import Pay from './Pay';
import Paid from './Paid';
import Evaluation from './Evaluation';

class MyBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '账单详情',
    };
    document.title = this.state.title;
  }
  render() {
    const { toEvaluate, details ,goods,bads } = this.props;
    const detailProps = { details,goods,bads };
    return (
      <div className={styles.myBillDetail}>
        <MyBillDetHead {...detailProps} />
        <BillDetail {...detailProps} />
        {  // 已支付未评价
          details.status && !details.isComment ? <Paid toEvaluate={toEvaluate}/> : null
        }
        { // 未支付
         !details.status ? <Pay toEvaluate={toEvaluate} /> : null
        }
        { // 已评价
          details.status && details.isComment ? <Evaluation {...detailProps} /> : null
        }
      </div>
    );
  }
}

export default MyBill;
