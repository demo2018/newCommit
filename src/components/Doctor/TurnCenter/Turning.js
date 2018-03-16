import { List } from 'antd-mobile';

const ListItem = List.Item;
const Brief = ListItem.Brief;

class Turning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '详情',
    };
    document.title = this.state.title;
  }
  renderList() {
    const { dataSoure = [1, 2] } = this.state;
    const { toDet } = this.props;
    return dataSoure.map((id) => {
      return (<ListItem
        key={id}
        className="borderBottom"
        arrow="horizontal"
        thumb={require('assets/head.png')}
        multipleLine
        onClick={() => { toDet(id); }}
        extra={<span className="turnStatu">已预约</span>}
      >
        <span className="customerName">柴杰秀</span>
        <Brief>
          <span className="date">2017-10-20</span>
          <span className="time">9:30</span></Brief>
      </ListItem>);
    })
      ;
  }
  render() {
    return (
      <List>
        {this.renderList()}
      </List>
    );
  }
}

export default Turning;
