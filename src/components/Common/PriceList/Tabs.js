import { Tabs, List } from 'antd-mobile';

const ListItem = List.Item;
const Brief = ListItem.Brief;

const tabs = [
  { title: '洗牙' },
  { title: '补牙' },
  { title: '美白' },
  { title: '拔牙' },
  { title: '正畸' },
];

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    return (
      <div className="pricelist-tab borderTop">
        <Tabs
          tabs={tabs}
          initialPage={0}
        >
          <div
            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}
          >
            <List>
              {this.renderList()}
            </List>
          </div>
          <div
            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}
          >
            <List>
              {this.renderList()}
            </List>
          </div>
          <div
            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}
          >
            <List>
              {this.renderList()}
            </List>
          </div>
          <div
            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}
          >
              <List>
                {this.renderList()}
              </List>
          </div>
          <div
            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}
          >
              <List>
                {this.renderList()}
              </List>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Tab;
