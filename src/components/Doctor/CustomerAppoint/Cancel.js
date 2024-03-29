import { List } from 'antd-mobile';
import { formatDate } from 'utils/common';

const ListItem = List.Item;

class Appoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelList: props.cancel,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('cancel' in nextProps && nextProps.cancel !== this.props.cancel) {
      this.setState({ cancelList: nextProps.cancel });
    }
  }
  renderList() {
    const { cancelList } = this.state;
    return (cancelList.content || []).map(({ patientName, phone, className, remark, time, cancelReason, id }, index) => {
      return (<ListItem
        key={index}
        className="borderBottom"
        align="middle"
        multipleLine
      >
        <div className="patientAppoint">
          <div>
            <div>
              <p><span className="customer-name">{patientName}</span><span className="customer-phone">({phone})</span></p>
              <del className="check-project">{className}</del>
              <p className="cancel-reason">取消原因 : {cancelReason}</p>
              <p className="timeInfo">
                <span className="check-date">{time}</span>
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
    return (<div>
      {
        cancelList.content && cancelList.content[0]
          ? <List>{this.renderList()} </List>
          : <p className="noList">暂无取消</p>
      }
    </div>
    );
  }
}

export default Appoint;
