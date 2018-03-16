import { List } from 'antd-mobile';
import formatDate from 'utils/common';

const ListItem = List.Item;
const getDetailBycancel = (details = {}) => {
  const { createTime } = details;
  return {
    ...details,
    createTime: createTime ? formatDate(createTime) : undefined,
  };
};

class Appoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelList: getDetailBycancel(props.cancel),
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('cancel' in nextProps && nextProps.cancel !== this.props.cancel) {
      this.setState({ cancelList: getDetailBycancel(nextProps.cancel) });
    }
  }
  renderList() {
    const { cancelList } = this.state;
    return (cancelList.content || []).map(({ realName, phone, className, remark, createTime, cancelReason, id }, index) => {
      return (<ListItem
        key={index}
        className="borderBottom"
        align="middle"
        multipleLine
      >
        <div className="patientAppoint">
          <div>
            <div>
              <p><span className="customer-name">{realName}</span><span className="customer-phone">({phone})</span></p>
              <del className="check-project">{className}</del>
              <p className="cancel-reason">取消原因 : {cancelReason}</p>
              <p className="timeInfo">
                <span className="check-date">{createTime}</span>
              </p>
            </div>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  render() {
    const { cancelList } = this.state;
    return (
      <List>
        {
          cancelList.content
            ? <div>{this.renderList()} </div>
            : <p>暂无取消</p>
        }

      </List>
    );
  }
}

export default Appoint;
