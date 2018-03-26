import { List } from 'antd-mobile';
import styles from './index.less';
import { formatDate } from 'utils/common';

const ListItem = List.Item;

class MyNotice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我的通知',
    };
    document.title = this.state.title;
  }
  renderList() {
    const { details } = this.props;
    return (details.content || []).map(({ id, createTime, phone, realName, message }, index) => {
      return (<ListItem
        key={index}
        className="borderBottom"
        align="middle"
        multipleLine
        extra={<p>{formatDate(createTime)}</p>}
      >
        <div className="myNoticeContent">
          <div>
            <div>
              <p>
                <span className="customer-name">{realName}</span> (<span className="customer-phone">{phone}</span>)
              </p>
              <p className="noticeContent">{message}</p>
            </div>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  render() {
    const { details } = this.props;
    return (
      <div className={styles.recordList}>
        {
          details.content && details.content[0]
            ? <List>
              {this.renderList()}
            </List>
            : <div className="noNotice">
              <p>暂无通知</p>
            </div>
        }
      </div>
    );
  }
}

export default MyNotice;
