import { List } from 'antd-mobile';
import { formatDate } from 'utils/common';

const ListItem = List.Item;

class Appoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readyList: props.ready,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('ready' in nextProps && nextProps.ready !== this.props.ready) {
      this.setState({ readyList: nextProps.ready });
    }
  }
  renderList() {
    const { readyList } = this.state;
    const { toDet } = this.props;
    return (readyList.content || []).map(({ patientName, phone, className, remark, createTime, id }, index) => {
      return (<ListItem
        key={index}
        className="borderBottom"
        align="middle"
        multipleLine
        onClick={() => { toDet(id); }}
      >
        <div className="patientAppoint">
          <div>
            <div>
              <p><span className="customer-name">{patientName}</span><span className="customer-phone">({phone})</span></p>
              <p className="check-project">{className}</p>
              <p className="note">备注 : {remark}</p>
              <p className="timeInfo">
                <span className="check-date">{formatDate(createTime)}</span>
              </p>
            </div>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  render() {
    const { readyList } = this.state;
    return (
      <List>
        {
          readyList.content && readyList.content[0]
            ? <div>{this.renderList()} </div>
            : <p className="noList">暂无预约</p>
        }

      </List>
    );
  }
}

export default Appoint;
