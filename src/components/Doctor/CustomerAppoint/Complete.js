import { List } from 'antd-mobile';
import formatDate from 'utils/common';

const ListItem = List.Item;
const Brief = ListItem.Brief;
const getDetailBycomplete = (details = {}) => {
  const { createTime } = details;
  return {
    ...details,
    createTime: createTime ? formatDate(createTime) : undefined,
  };
};

class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doneList: getDetailBycomplete(props.done),
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('done' in nextProps && nextProps.done !== this.props.done) {
      this.setState({ doneList: getDetailBycomplete(nextProps.done) });
    }
  }
  renderList() {
    const { doneList } = this.state;
    const { toCompleteDet } = this.props;
    return (doneList.content || []).map(({ patientName, itemName, status, actualCost, isComment, id} ) => {
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
            <Brief><span className="complete-date">2018-2-05</span><span className="complete-time">11:50</span></Brief>
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
          doneList.content
            ? <div>{this.renderList()} </div>
            : <p>暂无列表</p>
        }
      </List>
    );
  }
}

export default Complete;
