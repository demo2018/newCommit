import { List } from 'antd-mobile';
import styles from './index.less';

const ListItem = List.Item;
const Brief = ListItem.Brief;

class MyRec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我的病历',
    };
    document.title = this.state.title;
  }
  renderList() {
    const { details, toMyRecDet } = this.props;
    return (details.content || []).map(({ id, customerName, itemName }) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        arrow="horizontal"
        align="middle"
        multipleLine
        onClick={() => { toMyRecDet(id); }}
        extra={<span>初诊</span>}
      >
        <div className="myRecordContent">
          <div>
            <div><span className="check-project">{itemName}</span>-<span className="customer-name">{customerName}</span></div>
            <Brief className="check-date">2018-1-30</Brief>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  render() {
    const { details } = this.props;
    return (
      <div className={styles.myRec}>
        {
          details.content && details.content[0]
            ? <List>
              {this.renderList()}
            </List>
            :
            <div className="noRec">
              <p>暂无病历</p>
            </div>
        }
      </div>
    );
  }
}

export default MyRec;
