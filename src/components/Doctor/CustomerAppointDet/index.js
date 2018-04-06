import { Button } from 'antd-mobile';
import styles from './index.less';
import DetailHead from './DetailHead';

class MyBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '预约详情',
    };
    document.title = this.state.title;
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    const { toGenerateBill, details } = this.props;
    //  存储账单详情供发送账单页使用
    localStorage.setItem('appointBillDetails', JSON.stringify({
      appointId: details && details.appointId,
      customerId: details && details.id,
      patientName: details && details.patientName,
      time: details && details.time,
      doctorName: details && details.doctorName,
      address: details && details.address,
      itemClassId: details && details.itemClassId,
    }));
    toGenerateBill();
  }
  render() {
    const { details, projects } = this.props;
    const readyProps = { details, projects };
    return (
      <div className={styles.myBillDetail}>
         <DetailHead {...readyProps} />
        <Button type="primary" onClick={this.onClick}>生成账单</Button>
      </div>
    );
  }
}

export default MyBill;
