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
    return (
      <div className={styles.myCard}>
        <div className="cardTips">
          -<span className="doctorName">南哲</span>医生推荐您，预约薄荷好医生-
        </div>
        <CardInfo />
        <MoreDoctor />
        <Button type="primary">查看更多医生</Button>
      </div>
    );
  }
}

export default DoctorCard;
