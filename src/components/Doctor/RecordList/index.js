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
  renderFirstList() {
    const { details, toRecordListDet } = this.props;
    return (details.content || []).map(({ id, customerName, phone, itemName }) => {
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
                <span className="customer-name">{customerName}</span>
                <span className="customer-phone">({phone})</span>
                <span className="check-date">2018-1-30</span>
              </p>
              <p className="check-project">{itemName.replace('["', '').replace('"]', '')}</p>
            </div>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  renderAgainList() {
    const { details, toRecordListDet } = this.props;
    return (details.content || []).map(({ id, customerName, phone, itemName }) => {
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
                <span className="customer-name">{customerName}</span>
                <span className="customer-phone">({phone})</span>
                <span className="check-date">2018-1-30</span>
              </p>
              <p className="check-project">{itemName.replace('["', '').replace('"]', '')}</p>
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
        <SearchBar />
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { this.props.fetchSearchList({ type: index }); }}
          onTabClick={(tab, index) => { this.props.fetchSearchList({ type: index }); }}
        >
          <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            {
              details.content && details.content[0]
                ? <div>
                  {this.renderFirstList()}
                </div>
                : <div className="noRec">暂无病历</div>
            }
          </div>
          <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            {
              details.content && details.content[0]
                ? <div>
                  {this.renderAgainList()}
                </div>
                : <div className="noRec">暂无病历</div>
            }
          </div>
        </Tabs>
      </div>
    );
  }
}

export default RecordList;
