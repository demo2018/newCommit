import { Toast } from 'antd-mobile';


class AboutPatient extends React.Component {
   constructor(props) {
     super(props);
     this.state = {};
   }

   onClick() {
     Toast.info('开发中...', 1);
   }

   render() {
     const { toCustomerAppoint, toCustomerBill, toRecordList, toTurnCenter } = this.props;
     return (
      <div className="aboutPatient borderBottom borderTop">
        <ul>
          <li onClick={toCustomerAppoint}>
            <img src={require('images/customer-appoint.png')} alt="" />
            患者预约
          </li>
          <li onClick={() => { this.onClick() }}>
            {/* <li onClick={toTurnCenter}> */}
            <img src={require('images/patient.png')} alt="" />
            转诊患者
          </li>
          <li onClick={toCustomerBill}>
            <img src={require('images/patient-bill.png')} alt="" />
            患者账单
          </li>
          {/* <li onClick={toRecordList}> */}
          <li onClick={() => { this.onClick() }}>
            <img src={require('images/patient-rec.png')} alt="" />
            患者病历
          </li>
        </ul>
      </div>);
   }
}

 export default AboutPatient;
