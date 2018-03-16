import RecTab from './RecTab';
import styles from './index.less';
import RecHead from './RecHead';
import Complaint from './Complaint';
import PresentIllness from './PresentIllness';
import PastHistory from './PastHistory';
import Examine from './Examine';
import Diagnose from './Diagnose';
import Dispose from './Dispose';
import DoctorAdvice from './DoctorAdvice';
import Orthodontic from './Orthodontic';

class MyRecDet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '病历详情',
    };
    document.title = this.state.title;
  }
  render() {
    return (
      <div className={styles.myRecDet}>
        <RecHead />
        <RecTab />
        <Complaint />
        <PresentIllness />
        <PastHistory />
        {/* <Examine /> */}
        <Orthodontic />
        <Diagnose />
        <Dispose />
        <DoctorAdvice />
      </div>
    );
  }
}

export default MyRecDet;
