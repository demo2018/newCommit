import { List, DatePicker } from 'antd-mobile';
import styles from './index.less';
import { formatDate } from 'utils/common';

const ListItem = List.Item;
const Brief = ListItem.Brief;
const currentDate = new Date();


//  提取页面展示年月
const getDateStr = (date) => {
  if (date) {
    const month = date.getMonth() + 1;
    const chooseMonth = (month > 10 ? month : ('0' + month));
    return `${date.getFullYear()}年${chooseMonth}月`;
  }
  return '';
};

//  格式化回传给后台的年月
const getDate = (date) => {
  if (date) {
    const month = date.getMonth() + 1;
    const chooseMonth = (month < 10 ? '0' + month : month);
    return `${date.getFullYear()}-${chooseMonth}`;
  }
  return '';
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
  onChange=(dateMonth) => {
    const { chooseMonth } = this.props;
    this.setState({ dateMonth });
    chooseMonth(getDate(dateMonth));
  }
  renderTotal() {
    const { details = {} } = this.props;
    let total = 0;
    (details.content || []).map(({ money }, index) => {
      total += details.content[index].money;
    });
    return (<p className="income">收入: ￥<span>{total.toFixed(2)}</span></p>);
  }
  renderList() {
    const { details = {} } = this.props;
    return (details.content || []).map(({ id, name, money, createTime }) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        align="middle"
        multipleLine
        extra={<span className="detailMoney">￥{money.toFixed(2)}</span>}
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
    const { details = {} } = this.props;
    return (
      <div className={styles.myWalletDet}>
        <div>
          <div className="detailHead">
            <p className="nowMonth">{getDateStr(this.state.dateMonth)}</p>
            {this.renderTotal()}
            <DatePicker
              mode="month"
              minDate={new Date(2015, 10)}   // 设置最大最小可选年月
              maxDate={new Date()}
              value={this.state.dateMonth}
              onChange={this.onChange}
            >
              <p className="calendar"><span className="icon iconfont icon-rili"></span></p>
            </DatePicker>
          </div>
          {
            details.content && details.content[0]
              ? <List>
                {this.renderList()}
              </List>
              : <div className="noIncome"> 暂无明细 </div>
          }
        </div>
      </div >
    );
  }
}

export default MyWallet;
