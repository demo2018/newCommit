import styles from './index.less';
import BillDetHead from './BillDetHead';
import BillDetail from './BillDetail';
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
    const { details, goods, bads, projects } = this.props;
    const detailsProps = { details, goods, bads, projects };
    return (
      <div className={styles.billDetail}>
        <BillDetHead {...detailsProps} />
        <BillDetail {...detailsProps} />
        {
          details.isComment == 1
          ? <Evaluation {...detailsProps} />
          : null
        }
      </div>
    );
  }
}

export default MyBill;
