import { List, Picker } from 'antd-mobile';
import styles from './index.less';

const ListItem = List.Item;
const Brief = ListItem.Brief;
const month = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '10',
      value: '10',
    },
    {
      label: '11',
      value: '11',
    },
  ],
];

class MyWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '收入明细',
      sValue: [],
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
                <span className="income-date">{createTime}</span>
              </Brief>
            </div>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  render() {
    return (
      <div className={styles.myWalletDet}>
        <div>
          <div className="detailHead">
            <p className="nowMonth">{this.state.sValue}年{this.state.sValue}月</p>
            <p className="income">收入: ￥<span>12,800</span></p>
            <Picker
              data={month}
              cascade={false}
              value={this.state.sValue}
              onChange={v => this.setState({ sValue: v })}
              onOk={v => this.setState({ sValue: v })}
            >
              <div className="calendar"><span className="icon iconfont icon-rili"></span></div>
            </Picker>
          </div>
          <List>
            {this.renderList()}
          </List>
        </div>
        {/* <div className="noIncome">
          <img src={require('images/noRec.png')} alt="" />
        </div> */}
      </div>
    );
  }
}

export default MyWallet;
