import dva from 'dva';
import './index.html';
import './styles/common.less'; // 全局样式

const FastClick = require('fastclick'); // h5点击事件
FastClick.attach(document.body);

// 1. Initialize
const app = dva({
  onError(e) {
    console.log(e);
  }
});

// 3. Model
app.model(require('./models/layout'));
app.model(require('./models/common/login'));
app.model(require('./models/common/feedback'));
app.model(require('./models/common/changePhone'));
app.model(require('./models/common/doctorList'));
app.model(require('./models/common/doctorDetail'));
app.model(require('./models/common/doctorAppoint'));
app.model(require('./models/common/priceList'));
app.model(require('./models/common/priceListDet'));

app.model(require('./models/customer/userCenter'));
app.model(require('./models/customer/userInfo'));
app.model(require('./models/customer/addRelation'));
app.model(require('./models/customer/myAppoint'));
app.model(require('./models/customer/myBill'));
app.model(require('./models/customer/myBillDet'));
app.model(require('./models/customer/evaluate'));
app.model(require('./models/customer/set'));
app.model(require('./models/customer/cancelReason'));

app.model(require('./models/doctor/doctorCenter'));
app.model(require('./models/doctor/authenticationFailed'));
app.model(require('./models/doctor/doctorBasic'));
app.model(require('./models/doctor/doctorProfessional'));
app.model(require('./models/doctor/doctorSeniority'));
app.model(require('./models/doctor/doctorInfo'));
app.model(require('./models/doctor/customerAppoint'));
app.model(require('./models/doctor/customerAppointDet'));
app.model(require('./models/doctor/customerBill'));
app.model(require('./models/doctor/customerBillDet'));
app.model(require('./models/doctor/checkProject'));
app.model(require('./models/doctor/billDet'));
app.model(require('./models/doctor/myWallet'));
app.model(require('./models/doctor/myWalletDet'));
app.model(require('./models/doctor/myCard'));
app.model(require('./models/doctor/doctorSet'));
app.model(require('./models/doctor/notice'));
app.model(require('./models/doctor/myNotice'));
app.model(require('./models/doctor/doctorCard'));




// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
