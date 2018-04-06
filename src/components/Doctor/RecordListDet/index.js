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
    const { details } = this.props;
    const detailProps = { details };
    return (
      <div className={styles.myRecDet}>
        <RecHead {...detailProps} />
        <RecTab {...detailProps} />
        <Complaint {...detailProps} />
        <PresentIllness {...detailProps} />
        <PastHistory {...detailProps} />
        {/* <Examine {...detailProps}/> */}
        <Orthodontic {...detailProps} />
        <Diagnose {...detailProps} />
        <Dispose {...detailProps} />
        <DoctorAdvice {...detailProps} />
      </div>
    );
  }
}

export default MyRecDet;
