import { List } from 'antd-mobile';
import styles from './index.less';

const ListItem = List.Item;
const Brief = ListItem.Brief;

class MyBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我的账单',
    };
    document.title = this.state.title;
  }
  // //  获取项目
  renderProjects(num) {
    const { details, projects } = this.props;
    // const n = details.content[num].itemName;
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
    const { toBillDetail, details } = this.props;
    return (details.content || []).map(({ id, patientName, billId, actualCost, itemName, status, isComment }, index) => {
      return (
        <ListItem
          key={id}
          align="middle"
          multipleLine
          onClick={() => { toBillDetail(id); }}
          className="borderBottom"
        >
          <div className="myBillContent">
            <div>
              <div className="billhead">
                <span className="customer-name">{patientName}</span>
                {this.renderProjects(index)}
                {
                  status && status == 1
                    ? <div className="pay paid">
                      <span className="bepaid">已支付</span>
                    </div>
                    : <div className="pay">
                      <span className="bepaid">待支付</span>
                    </div>
                }
              </div>
              {isComment && isComment == 1 && status && status == 1 ? <div className="billEvaluation billEvaluated">已评价</div> : null}
              {status == 1 && isComment == 0 ? <div className="billEvaluation">评价</div> : null}
              <Brief className="billNums">账单号：<span className="billno">{billId}</span></Brief>
              <Brief className="billprice">￥<span className="billno">{actualCost.toFixed(2)}</span></Brief>
            </div>
          </div>
        </ListItem>);
    });
  }
  render() {
    const { details } = this.props;
    return (
      <div className={styles.myBill}>
          {
          details.content && details.content[0]
            ? <List>{this.renderList()} </List>
            : <p className="noBill">暂无账单</p>
          }
      </div>
    );
  }
}

export default MyBill;
