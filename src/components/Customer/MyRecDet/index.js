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

class MyRecDet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我的病历',
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
        <Examine />
        <Diagnose />
        <Dispose />
        <DoctorAdvice />
      </div>
    );
  }
}

export default MyRecDet;
