import { List } from 'antd-mobile';
import { formatDate } from 'utils/common';

const ListItem = List.Item;
const Brief = ListItem.Brief;

class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doneList: props.done,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('done' in nextProps && nextProps.done !== this.props.done) {
      this.setState({ doneList: nextProps.done });
    }
  }
  // //  获取项目
  renderProjects(num) {
    const { doneList } = this.state;
    const { projects } = this.props;
    const chosedProjects = projects
      .filter(({ className }) => {
        return doneList.content[num].itemName.includes(className) || doneList.content[num].itemName.includes(`${className}`);
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
    const { doneList } = this.state;
    const { toCompleteDet } = this.props;
    return (doneList.content || []).map(({ patientName, itemName, status, actualCost, isComment, id, createTime }, index) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        align="middle"
        multipleLine
        onClick={() => { toCompleteDet(id); }}
      >
        <div className="myBillContent">
          <div>
            <div className="billhead">
              <span className="customer-name">{patientName}</span>
              {this.renderProjects(index)}
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
    const { doneList } = this.state;
    return (
      <List>
        {
          doneList.content && doneList.content[0]
            ? <div>{this.renderList()} </div>
            : <p className="noList">暂无列表</p>
        }
      </List>
    );
  }
}

export default Complete;
