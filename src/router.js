import { Router, Route, IndexRedirect } from 'dva/router';
import cookie from 'js-cookie';
import pages from './pages';

const isLogin = (nextState, replace) => {
  if (!cookie.get('sessiobid')) {
    replace('/login');
  }
};

export default function ({ history }) {
  return (<Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/">
      <IndexRedirect to="/login" />
      <Route path="/login" component={pages.Login} />
      {/* 患者 */}
      <Route path="/user" component={pages.Layout} onEnter={isLogin}>
        <IndexRedirect to="/user/center" />
        <Route path="/user/center" component={pages.UserCenter} breadcrumbName="用户中心" />
        <Route path="/user/userinfo" component={pages.UserInfo} breadcrumbName="个人信息" />
        <Route path="/user/name" component={pages.CustomerName} breadcrumbName="个人姓名" />
        <Route path="/user/addrelation" component={pages.AddRelation} breadcrumbName="添加关系成员" />
        <Route path="/user/updaterelation/:id/:relationId" component={pages.AddRelation} breadcrumbName="更新关系成员" />
        <Route path="/user/myappoint" component={pages.MyAppoint} breadcrumbName="我的预约" />
        <Route path="/user/cancelreason/:id" component={pages.CancelReason} breadcrumbName="取消预约" />
        <Route path="/user/myimage" component={pages.MyImage} breadcrumbName="我的影像" />
        <Route path="/user/myimagedetail/:id" component={pages.MyImgDet} breadcrumbName="我的影像详情" />
        <Route path="/user/myrecord" component={pages.MyRec} breadcrumbName="我的病历" />
        <Route path="/user/myrecorddetail/:id" component={pages.MyRecDet} breadcrumbName="我的病历详情" />
        <Route path="/user/mybill" component={pages.MyBill} breadcrumbName="我的账单" />
        <Route path="/user/mybilldetail/:id" component={pages.MyBillDet} breadcrumbName="我的账单详情" />
        <Route path="/user/evaluate" component={pages.Evaluate} breadcrumbName="评价" />
        <Route path="/user/mycoupons" component={pages.MyCoupons} breadcrumbName="我的优惠券" />
        <Route path="/user/couponsinstructions" component={pages.CouponsInstructions} breadcrumbName="优惠券说明" />
        <Route path="/user/set" component={pages.Set} breadcrumbName="设置" />
      </Route>

      {/* 医生 */}
      <Route path="/doctor" component={pages.Layout} onEnter={isLogin}>
        <IndexRedirect to="/doctor/center" />
        <Route path="/doctor/center" component={pages.DoctorCenter} breadcrumbName="用户中心" />
        <Route path="/doctor/basic" component={pages.DoctorBasic} breadcrumbName="医生基本信息认证" />
        <Route path="/doctor/professional" component={pages.DoctorProfessional} breadcrumbName="医生执业认证" />
        <Route path="/doctor/seniority" component={pages.DoctorSeniority} breadcrumbName="医生资格认证" />
        <Route path="/doctor/authenticationfailed" component={pages.AuthenticationFailed} breadcrumbName="认证失败原因" />
        <Route path="/doctor/certificationresult" component={pages.CertificationResult} breadcrumbName="认证结果" />
        <Route path="/doctor/info" component={pages.DoctorInfo} breadcrumbName="个人信息" />
        <Route path="/doctor/name" component={pages.DoctorName} breadcrumbName="个人姓名" />
        <Route path="/doctor/doctorset" component={pages.DoctorSet} breadcrumbName="设置" />
        <Route path="/doctor/notice" component={pages.Notice} breadcrumbName="通知设置" />
        <Route path="/doctor/mynotice" component={pages.MyNotice} breadcrumbName="我的通知" />
        <Route path="/doctor/recordlist" component={pages.RecordList} breadcrumbName="患者病历" />
        <Route path="/doctor/recordlistdetail/:id" component={pages.RecordListDet} breadcrumbName="病历详情" />
        <Route path="/doctor/customerappoint" component={pages.CustomerAppoint} breadcrumbName="患者预约" />
        <Route path="/doctor/customerappointdetail/:id" component={pages.CustomerAppointDet} breadcrumbName="患者预约详情" />
        <Route path="/doctor/checkproject" component={pages.CheckProject} breadcrumbName="账单价格表" />
        <Route path="/doctor/billdetail" component={pages.BillDet} breadcrumbName="账单详情" />
        <Route path="/doctor/customerbill" component={pages.CustomerBill} breadcrumbName="患者账单" />
        <Route path="/doctor/customerbilldetail/:id" component={pages.CustomerBillDet} breadcrumbName="患者账单详情" />
        <Route path="/doctor/mycard" component={pages.MyCard} breadcrumbName="我的名片" />
        <Route path="/doctor/mywallet" component={pages.MyWallet} breadcrumbName="我的钱包" />
        <Route path="/doctor/mywalletdetail" component={pages.MyWalletDet} breadcrumbName="我的钱包明细" />
        <Route path="/doctor/doctorcard" component={pages.DoctorCard} breadcrumbName="医生名片" />
        <Route path="/doctor/turncenter" component={pages.TurnCenter} breadcrumbName="转诊中心" />
        <Route path="/doctor/reservationprocess/:id" component={pages.ReservationProcess} breadcrumbName="预约详情" />
        <Route path="/doctor/referralcomplete/:id" component={pages.ReferralComplete} breadcrumbName="转诊成功详情" />
        <Route path="/doctor/referralreport" component={pages.ReferralReport} breadcrumbName="转诊报告" />
      </Route>

      {/* 公共  */}
      <Route path="/common">
        <Route path="/common/changephone" component={pages.ChangePhone} breadcrumbName="更换手机号" />
        <Route path="/common/feedback" component={pages.Feedback} breadcrumbName="意见反馈" />
        <Route path="/common/feedbackresult" component={pages.FeedbackResult} breadcrumbName="反馈结果" />
        <Route path="/common/pricelist" component={pages.PriceList} breadcrumbName="价格表" />
        <Route path="/common/pricelistdetail/:id" component={pages.PriceListDet} breadcrumbName="价格详情" />

        <Route path="/common/contactservice" component={pages.ContactService} breadcrumbName="接入美洽" />

        <Route path="/common/doctors/list" component={pages.DoctorList} breadcrumbName="医生团队" />
        <Route path="/common/doctors/detail/:id" component={pages.DoctorDetail} breadcrumbName="医生详情" />
        <Route path="/common/doctors/appoint/:id" component={pages.DoctorAppoint} breadcrumbName="预约" />
        <Route path="/common/doctors/appointresult" component={pages.AppointResult} breadcrumbName="预约结果" />
      </Route>
    </Route>
  </Router >);
}
