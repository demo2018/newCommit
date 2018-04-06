import { Button, Toast, Card, ActionSheet, List, Switch, InputItem } from 'antd-mobile';
import styles from './index.less';


//  获取折扣
const getDiscountByStates = (details = {}) => {
  const { content = [] } = details;
  const priceDiscount = content
    .filter(({ status }) => {
      return status == 1;
    })
    .map(({ limitPercentage }) => {
      return (limitPercentage * 10) + '折';
    });
  return {
    ...details,
    priceDiscount,
  };
};

const formatNum = (num) => {
  return num.toFixed(2);
};

class MyBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '账单详情',
      timeVisible: false, // 复诊状态
      againTime: '', // 复诊时间
      chooseDiscount: getDiscountByStates(props.discount),
      billDetails: {},
    };
    document.title = this.state.title;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 进入页面获取传过来的账单详情

  componentWillReceiveProps(nextProps) {
    //  获取账单头部详情
    const details = JSON.parse(localStorage.getItem('appointBillDetails'));
    const { projects } = this.props;
    const itemName = (projects.content || [])
    .filter(({ id }) => {
      return details.itemClassId && details.itemClassId == id;
    })
      .map(({ className }) => {
        return className;
      });
    // });
    const { billDetails } = this.props;
    //  从选择账单页面选择生成的数组
    const dataSoure = JSON.parse(localStorage.getItem('selectedProjects'));
    if ('discount' in nextProps && nextProps.discount !== this.props.discount) {
      this.setState({ chooseDiscount: getDiscountByStates(nextProps.discount) });
    }
    const { itemslist = [] } = billDetails;
    let cost = 0;
    for (let i = 0; i < dataSoure.length; i++) {
      itemslist[i] = { itemId: dataSoure[i].value, num: dataSoure[i].countnum, discount: 1, price: dataSoure[i].extra };
      cost += itemslist[i].num * itemslist[i].price;
    }
    return (
      this.setState({
        billDetails: {
          ...billDetails,
          appointmentId: details.customerId,
          itemNames: itemName,
          items: itemslist,
          actualCost: cost,
          discount: 1,
          originalCost: cost,
        }
      })
    );
  }

  // 选择复诊状态
  handleSwitchChange(switchName) {
    const { billDetails } = this.state;
    return (value) => {
      this.setState({
        [switchName]: value,
        timeVisible: !this.state.timeVisible,
        billDetails: { ...billDetails, isRecheck: this.state.timeVisible ? 1 : 0 }
      });
    };
  }
  // 选择复诊时间
  showAgainActionSheet = () => {
    const BUTTONS = ['一周后', '两周后', '一个月后', '取消'];
    const { billDetails } = this.state;
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      maskClosable: true,
      'data-seed': 'logId',
    },
      (buttonIndex) => {
        this.setState({ againTime: BUTTONS[buttonIndex] });
        if (buttonIndex == BUTTONS.length - 1) {
          this.setState({ againTime: '' });
        }
        this.setState({ billDetails: { ...billDetails, recheckDate: buttonIndex } });
      });
  }

  // 获取备注
  handleChange(key) {
    return (value) => {
      const { billDetails } = this.state;
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ billDetails: { ...billDetails, [key]: value } });
    };
  }


  //  提交生成账单
  handleSubmit() {
    const { sendBillOut, details } = this.props;
    const { billDetails } = this.state;
    Toast.loading('账单发送中');
    sendBillOut(billDetails);
    console.log(details);
  }

  // 子项折扣弹出
  showBillActionSheet = (key) => {
    const { chooseDiscount, billDetails } = this.state;
    const { priceDiscount } = chooseDiscount;
    //  拼接获取的折扣和取消按钮
    const cancel = ['取消'];
    const contact = [...priceDiscount, ...cancel];
    const BUTTONS = contact;
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      maskClosable: true,
      'data-seed': 'logId',
    },
      (buttonIndex) => {
        const discountNum = (BUTTONS[buttonIndex].replace(new RegExp('折'), '')) / 10;
        let cost = 0;
        for (let i = 0; i < billDetails.items.length; i++) {
          if (i == key) {
            if (buttonIndex == BUTTONS.length - 1) {   // 点击取消时默认折扣转为1
              billDetails.items[i] = { ...billDetails.items[i], discount: 1 };
              cost += billDetails.items[i].num * billDetails.items[i].price * 1
                * (billDetails.discount ? billDetails.discount : 1);
            } else {
              billDetails.items[i] = { ...billDetails.items[i], discount: discountNum };
              cost += billDetails.items[i].num * billDetails.items[i].price * discountNum
                * (billDetails.discount ? billDetails.discount : 1);
            }
          } else {
            cost += billDetails.items[i].num * billDetails.items[i].price
            * (billDetails.items[i].discount ? billDetails.items[i].discount : 1)
            * (billDetails.discount ? billDetails.discount : 1);
          }
        }
        this.setState({
          billDetails: {
            ...billDetails, items: billDetails.items,
            actualCost: formatNum(cost),
          }
        });
      });
  }


  // 合计折扣弹出
  showTotalActionSheet = () => {
    const { chooseDiscount, billDetails } = this.state;
    const { priceDiscount } = chooseDiscount;
    const { discount } = billDetails;
    //  拼接获取的折扣和取消按钮
    const cancel = ['取消'];
    const contact = [...priceDiscount, ...cancel];
    const BUTTONS = contact;
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      maskClosable: true,
      'data-seed': 'logId',
    },
      (buttonIndex) => {
        const discountNum = (BUTTONS[buttonIndex].replace(new RegExp('折'), '')) / 10;
        let cost = 0;
        for (let i = 0; i < billDetails.items.length; i++) {
          cost += billDetails.items[i].num * billDetails.items[i].price
            * (billDetails.items[i].discount ? billDetails.items[i].discount : 1);
        }
        if (buttonIndex == BUTTONS.length - 1) {
          this.setState({
            billDetails: {
              ...billDetails,
              discount: 1,
              actualCost: formatNum(1 * cost),
            }
          });
        } else {
          if (discountNum != discount) {
            this.setState({
              billDetails: {
                ...billDetails,
                discount: discountNum,
                actualCost: formatNum(discountNum * cost),
              }
            });
          }
        }
      });
  }

  // 账单详情
  renderDetailList() {
    const dataSoure = JSON.parse(localStorage.getItem('selectedProjects'));
    const { billDetails = {} } = this.state;
    const { items = [] } = billDetails;
    return (dataSoure || []).map(({ value, extra, countnum, proname }, index) => {
      return (
        <tr key={index}>
          <td>
            <span className="patient-project">{proname}</span>
            <p className="patient-pro-discount">折扣：
              <span
                className="pro-discount-det"
                onClick={() => this.showBillActionSheet(index)}
              >
                {items[index] && items[index].discount != 1 ? ((items[index].discount * 10) + '折') : '选择折扣'}
              </span>
            </p>
          </td>
          <td className="patient-pronum">{countnum}</td>
          <td>
            <span className="patient-proprice">{items[index] && items[index].discount ? formatNum(countnum * extra * items[index].discount) : formatNum(countnum * extra)}</span>
            {
              items[index] && items[index].discount != 1
                ? <p className="original-price">
                  {formatNum(countnum * extra)}
                </p>
                : null
            }
          </td>
        </tr>);
    });
  }

  // 复诊开启显示内容
  renderList() {
    return (
      <div className="AgainTime">
        <div className="again">
          <List>
            <List.Item
              className="borderBottom"
              arrow="horizontal"
              onClick={this.showAgainActionSheet}
              extra={this.state.againTime}
            >复诊时间</List.Item>
            <InputItem
              placeholder="请输入"
              onChange={this.handleChange('remark')}
            >备注信息</InputItem>
          </List>
        </div>
      </div>
    );
  }
  //  获取项目
  renderProjects() {
    const details = JSON.parse(localStorage.getItem('appointBillDetails'));
    const { projects } = this.props;
    return (projects.content || [])
      .filter(({ id }) => {
        return details.itemClassId && details.itemClassId == id;
      })
      .map(({ id, className }, index) => {
        return (<span key={index}>{className}</span>);
      });
  }
  render() {
    const details = JSON.parse(localStorage.getItem('appointBillDetails'));
    const { timeVisible, billDetails } = this.state;

    return (
      <div className={styles.myBillDetail}>

        {/* 头部 */}
        <div className="myBillDetHeadContent">
          <div className="card-header">
            账单号：<span className="billno">{details.appointId}</span>
          </div>
          <Card full>
            <Card.Header
              title={details.patientName}
            />
            <Card.Body>
              <ul>
                <li className="diagnosisPro"><img src={require('images/tooth.png')} alt="" />就诊项目：{this.renderProjects()}</li>
                <li className="clinic-time"><img src={require('images/clock.png')} alt="" />就诊时间：
                  <span className="clinic-date">{details.time}</span>
                </li>
                <li><img src={require('images/doctor.png')} alt="" />就诊医生：<span className="clinic-doctor">{details.doctorName}</span></li>
                <li className="clinic-place"><img src={require('images/place.png')} alt="" /><em>就诊地点：</em><span className="clinic-address">{details.address}</span></li>
              </ul>
            </Card.Body>
          </Card>
        </div>

        {/* 账单详情 */}
        <div className="myBillDetContent">
          <div className="bill-det borderBottom">
            <p className="bill-dethead">账单明细</p>
            <div className="tableWrapper borderBottom borderTop">
              <table cellSpacing="0" cellPadding="0">
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>数量</th>
                    <th>价格</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderDetailList()}
                </tbody>
                <tfoot>
                  <tr className="combined">
                    <td>
                      <span className="combined-price">合计</span>
                      <p>折扣：
                      <span
                          className="combined-discount"
                          onClick={this.showTotalActionSheet}
                        >
                          {billDetails && billDetails.discount != 1 ? ((billDetails.discount * 10) + '折') : '选择折扣'}
                        </span>
                      </p>
                    </td>
                    <td></td>
                    <td>
                      <span className="combined-discount-price">￥{billDetails.actualCost}</span>
                      {
                        billDetails && billDetails.discount != 1
                          ? <p className="original-price">
                            {billDetails.originalCost}
                          </p>
                          : null
                      }
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* 复诊 */}
        <div className="visitAgain">
          <List>
            <List.Item
              extra={<Switch
                checked={this.state.switch}
                onChange={this.handleSwitchChange('switch')}
              />}
            >
              复诊
          </List.Item>
          </List>
          {timeVisible && this.renderList()}
        </div>


        <Button type="primary" onClick={this.handleSubmit}>发送给客户</Button>
      </div>
    );
  }
}

export default MyBill;
