import { Button } from 'antd-mobile';
import MoreDoctor from './MoreDoctor';
import CardInfo from './CardInfo';
import styles from './index.less';

class DoctorCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { list, doctorInfo, toAppoint, toRecordListDet } = this.props;
    const listProps = { list };
    const infoProps = { doctorInfo, toRecordListDet };
    return (
      <div className={styles.myCard}>
        <div className="cardTips">
          -<span className="doctorName">{doctorInfo.realName}</span>医生推荐您，预约薄荷好医生-
        </div>
        <CardInfo {...infoProps} />
        <MoreDoctor {...listProps} />
        <Button type="primary" onClick={toAppoint}>查看更多医生</Button>
      </div>
    );
  }
}

export default DoctorCard;
