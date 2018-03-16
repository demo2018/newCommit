import DoctorHead from './DoctorHead';
import styles from './index.less';
import AboutPatient from './AboutPatient';
import DoctorFunction from './DoctorFunction';

class DoctorCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '用户中心',
    };
    document.title = this.state.title;
  }
  render() {
    const { toCertification, toDoctorInfo,
      toDoctorCard, toMyWallet, toNotice, toFeedback,
      toDoctorSet, toCustomerAppoint, toCustomerBill,
      toRecordList, toTurnCenter, toAuthenticationFailed, details } = this.props;
    const headProps = {
      details
    };


    return (
      <div className={styles.doctorCenter}>
        <DoctorHead
          toCertification={toCertification}
          toDoctorInfo={toDoctorInfo}
          toAuthenticationFailed={toAuthenticationFailed}
          {...headProps}
        />
        <AboutPatient
          toCustomerAppoint={toCustomerAppoint}
          toCustomerBill={toCustomerBill}
          toRecordList={toRecordList}
          toTurnCenter={toTurnCenter}
        />
        <DoctorFunction
          toDoctorCard={toDoctorCard}
          toMyWallet={toMyWallet}
          toNotice={toNotice}
          toFeedback={toFeedback}
          toDoctorSet={toDoctorSet}
        />
      </div>
    );
  }
}

export default DoctorCenter;
