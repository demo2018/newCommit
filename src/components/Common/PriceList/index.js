import { SearchBar, Tabs, List, ActivityIndicator } from 'antd-mobile';
import styles from './index.less';

const ListItem = List.Item;
const Brief = ListItem.Brief;
//  上方父级
const formatTabs = (tabs = []) => {
  return tabs
    .filter(({ type }) => {
      return type === 0;
    })
    .map(({ className, id }) => {
      return {
        key: id,
        title: className,
      };
    });
};
//  子级项目
const formatProjects = (projects = []) => {
  return projects
    .map(({ name, id, price }) => {
      return {
        value: id,
        label: name,
        extra: price,
      };
    });
};

class PriceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '价格表',
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    document.title = this.state.title;
  }
  handleTabChange({ key }) {
    const { getProjects } = this.props;
    getProjects(key);
  }
  renderTab() {
    const { projects = [], toPriceDetail } = this.props;
    const newProjects = formatProjects(projects);
    return (
      <div style={{ backgroundColor: '#fff' }}>
        <List>
          {newProjects.map(({ value, label, extra }, index) => (
            <ListItem
              key={index}
              arrow="horizontal"
              align="middle"
              multipleLine
              onClick={() => (toPriceDetail(value))}
            >
              <div className="priceContent">
                <img src={require('assets/head.png')} alt="项目" />
                <div>
                  <div>{label}</div>
                  <Brief>{extra}元/颗</Brief>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
  renderList() {
    const { dataSoure = [1, 2, 3, 4, 5] } = this.state;
    const { toPriceDetail } = this.props;
    return dataSoure.map((id) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        arrow="horizontal"
        align="middle"
        multipleLine
        onClick={() => (toPriceDetail(id))}
      >
        <div className="priceContent">
          <img src={require('assets/head.png')} alt="项目" />
          <div>
            <div>填充 •邻面成型</div>
            <Brief>600元/颗</Brief>
          </div>
        </div>
      </ListItem>);
    })
      ;
  }
  render() {
    const { projects = [], toContactService } = this.props;
    const { loading, tabs = [] } = this.props;
    const newTabs = formatTabs(tabs);
    // const newProjects = formatProjects(projects);
    return (
      <div className={styles.priceList}>
        <SearchBar placeholder="按项目名称搜索" />
        <ActivityIndicator animating={loading} toast />
        <div className="pricelist-tab borderTop">
          <Tabs
            tabs={newTabs}
            onChange={this.handleTabChange}
          />
          <div className="tabContent">
            {/* {
              newProjects
                ?  */}
                <div>{this.renderTab()}</div>
                {/* : <div>暂无项目</div>
            } */}
          </div>
        </div>
        <div className="consulting" onClick={toContactService}>
          <img src={require('images/consulting.png')} alt="咨询" />
        </div>
      </div >
    );
  }
}

export default PriceList;
