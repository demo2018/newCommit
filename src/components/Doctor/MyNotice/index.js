import { List } from 'antd-mobile';
import styles from './index.less';

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
    const { dataSoure = [1, 2, 3] } = this.state;
    return dataSoure.map((id) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        align="middle"
        multipleLine
        extra={<p><span>2017-12-12</span><span>14:30</span></p>}
      >
        <div className="myNoticeContent">
          <div>
            <div>
              <p>
                <span className="customer-name">李四</span> (<span className="customer-phone">18632273417</span>)
              </p>
              <p className="noticeContent">已扫码你的二维码</p>
            </div>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  render() {
    return (
      <div className={styles.recordList}>
        <List>
          {this.renderList()}
        </List>

        {/* <div className="noNotice">
          <p>暂无通知</p>
        </div> */}
      </div>
    );
  }
}

export default MyNotice;
