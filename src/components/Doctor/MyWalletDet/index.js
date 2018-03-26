import { List, DatePicker } from 'antd-mobile';
import styles from './index.less';
import { formatDate } from 'utils/common';

const ListItem = List.Item;
const Brief = ListItem.Brief;
const currentDate = new Date();


//  提取年月
const getDateStr = (date) => {
  if (date) {
    const month = date.getMonth() + 1;
    const chooseMonth = (month < 10 ? 0 + month : month);
    return `${date.getFullYear()}年${chooseMonth}月`;
  }
  return '';
};


// 获取总价
const getTotal = (monthIncome = {}) => {
  return Object.keys(monthIncome).reduce((TotalPrice, key) => {
    const { money } = monthIncome[key] || {};
    return TotalPrice + money;
  }, 0);
};

class MyWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '收入明细',
      dateMonth: currentDate,
    };
    document.title = this.state.title;
  }
  renderList() {
    const { details } = this.props;
    return (details.content || []).map(({ id, name, money, createTime }) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        align="middle"
        multipleLine
        extra={<span className="detailMoney">￥{money}</span>}
      >
        <div className="income-detail">
          <div>
            <div>
              <p><span className="income-project">{name}</span></p>
              <Brief>
                <span className="income-date">{formatDate(createTime)}</span>
              </Brief>
            </div>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  render() {
    const { details } = this.props;
    return (
      <div className={styles.myWalletDet}>
        <div>
          <div className="detailHead">
            <p className="nowMonth">{getDateStr(this.state.dateMonth)}</p>
            <p className="income">收入: ￥<span>{getTotal(details.money)}</span></p>
            <DatePicker
              mode="month"
              minDate={new Date(2015, 10)}   // 设置最大最小可选年月
              maxDate={new Date()}
              value={this.state.dateMonth}
              onChange={dateMonth => { this.setState({ dateMonth }); }}
            >
              <p className="calendar"><span className="icon iconfont icon-rili"></span></p>
            </DatePicker>
          </div>
          <List>
            {this.renderList()}
          </List>
        </div>
        {/* <div className="noIncome">
          <img src={require('images/noRec.png')} alt="" />
        </div> */}
      </div >
    );
  }
}

export default MyWallet;
