import DoctorHead from './DoctorHead';
import styles from './index.less';
import AboutPatient from './AboutPatient';
import DoctorFunction from './DoctorFunction';

// 擅长
const getGoodFromData = (partment = {}) => {
  const { content = [] } = partment;
  //  从后台获取擅长
  const pickerGood = content.map(({ id, name }) => {
    return {
      value: id,
      label: name,
    };
  });
  localStorage.setItem('adepts', JSON.stringify(pickerGood));
  return {
    ...partment,
    pickerGood,
  };
};

class DoctorCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '用户中心',
      goods: getGoodFromData(props.goodat),
    };
    document.title = this.state.title;
  }
  componentWillReceiveProps(nextProps) {
    if ('goodat' in nextProps && nextProps.goodat !== this.props.goodat) {
      this.setState({ goods: getGoodFromData(nextProps.goodat) });
    }
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
          toDoctorInfo={toDoctorInfo}
          toCertification={toCertification}
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
