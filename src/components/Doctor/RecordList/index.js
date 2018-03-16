import { List, Tabs } from 'antd-mobile';
import styles from './index.less';
import SearchBar from './SearchBar';

const ListItem = List.Item;
const tabs = [
  { title: '初诊', },
  { title: '复诊', },
];

class RecordList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '患者病历',
    };
    document.title = this.state.title;
  }
  renderList() {
    const { dataSoure = [1, 2, 3] } = this.state;
    const { toRecordListDet } = this.props;
    return dataSoure.map((id) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        align="middle"
        multipleLine
        onClick={() => { toRecordListDet(id); }}
      >
        <div className="myRecordContent">
          <div>
            <div>
              <p>
                <span className="customer-name">李四</span>
                <span className="customer-phone">(18632273417)</span>
                <span className="check-date">2018-1-30</span>
              </p>
              <p className="check-project">慢性牙龈炎</p>
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
        <SearchBar />
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            {this.renderList()}
          </div>
          <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div className="noRec">
              <p>暂无病历</p>
            </div>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default RecordList;
