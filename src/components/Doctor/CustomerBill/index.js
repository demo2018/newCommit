import { List } from 'antd-mobile';
import styles from './index.less';
import SearchBar from './SearchBar';
import { formatDate } from 'utils/common';

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
  // //  获取项目
  renderProjects(num) {
    const { details, projects } = this.props;
    const chosedProjects = projects
      .filter(({ className }) => {
        return details.content[num].itemName.includes(className) || details.content[num].itemName.includes(`${className}`);
      })
      .map(({ className }) => {
        return className;
      });
    return chosedProjects
      .map((index) => {
        return (<span className="check-pro" key={index}>{chosedProjects}</span>);
      });
  }
  renderList() {
    const { toBillDetail } = this.props;
    const { details } = this.state;
    return (details.content || []).map(({ patientName, itemName, status, actualCost, isComment, createTime, id }, index) => {
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
              {/* {this.renderProjects(index)} */}
              <span className="check-pro">{itemName.replace('["', '').replace('"]', '')}</span>
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
            <Brief><span className="complete-date">{formatDate(createTime)}</span></Brief>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  render() {
    const { fetchSearchList, search } = this.props;
    const searchBarProps = {
      search,
      fetchSearchList,
    };
    return (
      <div className={styles.customerBill}>
        <SearchBar {...searchBarProps} />
        <List>
          {this.renderList()}
        </List>
      </div>
    );
  }
}

export default CustomerBill;
