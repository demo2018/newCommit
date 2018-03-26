import { Tabs } from 'antd-mobile';
import styles from './index.less';
import SearchBar from './SearchBar';
import Appoint from './Appoint';
import Complete from './Complete';
import Cancel from './Cancel';


const tabs = [
  { title: '预约中', },
  { title: '已完成', },
  { title: '已取消', },
];

class CustomerAppoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '患者预约',
    };
    document.title = this.state.title;
  }
  render() {
    const { toDet, toCompleteDet, ready, done, cancel, fetchSearchList, search, projects } = this.props;
    const readyProps = { ready };
    const doneProps = { done, projects };
    const cancelProps = { cancel };
    const searchBarProps = {
      search,
      fetchSearchList,
    };
    return (
      <div className={styles.customerAppoint}>
        <SearchBar {...searchBarProps} />
        <Tabs
          tabs={tabs}
          initialPage={0}
        >
          <div style={{ display: 'block', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Appoint toDet={toDet} {...readyProps} />
          </div>
          <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Complete toCompleteDet={toCompleteDet} {...doneProps} />
          </div>
          <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Cancel {...cancelProps} />
          </div>
        </Tabs>
      </div>
    );
  }
}

export default CustomerAppoint;
