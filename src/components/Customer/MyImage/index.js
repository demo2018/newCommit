import { List } from 'antd-mobile';
import styles from './index.less';

const ListItem = List.Item;
const Brief = ListItem.Brief;

class MyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我的影像',
    };
    document.title = this.state.title;
  }
  renderList() {
    const { dataSoure = [1, 2, 3] } = this.state;
    const { toMyImgDet } = this.props;
    return dataSoure.map((id) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        arrow="horizontal"
        align="middle"
        multipleLine
        onClick={() => { toMyImgDet(id); }}
      >
        <div className="myImageContent">
          <div>
            <div><span className="check-project">洗牙</span>-<span className="customer-name">李四</span></div>
            <Brief className="check-date">2018-1-30</Brief>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  render() {
    return (
      <div className={styles.myImage}>
        <List>
          {this.renderList()}
        </List>
        {/* <div className="noImg">
          <img src={require('../../../images/noimg.png')} alt="暂无影像" />
        </div> */}
      </div>
    );
  }
}

export default MyImage;
