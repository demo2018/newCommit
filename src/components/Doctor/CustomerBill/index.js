import { List } from 'antd-mobile';
import styles from './index.less';
import SearchBar from './SearchBar';
import formatDate from 'utils/common';

const ListItem = List.Item;
const Brief = ListItem.Brief;
// const getDetailFromDetails = (details = {}) => {
//   const { createTime } = details && details.content;
//   // const { createTime } = content;
//   console.log(createTime);
//   return {
//     ...details,
//     // createTime: createTime ? new Date(createTime) : undefined,
//   };
// };

class CustomerBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '患者账单',
      details: props.details,
    };
    document.title = this.state.title;
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ details: nextProps.details });
    }
  }
  renderList() {
    const { toBillDetail } = this.props;
    const { details } = this.state;
    console.log(details);
    return (details.content || []).map(({ patientName, itemName, status, actualCost, isComment, createTime, id }) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        align="middle"
        multipleLine
        onClick={() => { toBillDetail(id); }}
      >
        <div className="myBillContent">
          <div>
            <div className="billhead">
              <span className="customer-name">{patientName}</span>
              <span className="check-pro">{itemName}</span>
            </div>

            {
              status && status == 1
                ? <div className="pay paid">
                  <span className="bepaid">已支付</span>
                  <span className="price">￥{actualCost}</span>
                  {
                    isComment == 1
                      ? <span className="evaluation">查看评价</span>
                      : null
                  }
                </div>
                : <div className="pay">
                  <span className="bepaid">待支付</span>
                  <span className="price">￥{actualCost}</span>
                </div>
            }
            <Brief><span className="complete-date">{createTime}</span></Brief>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  render() {
    return (
      <div className={styles.customerBill}>
        <SearchBar />
        <List>
          {this.renderList()}
        </List>
      </div>
    );
  }
}

export default CustomerBill;
