import { List } from 'antd-mobile';

const ListItem = List.Item;
const Brief = ListItem.Brief;

class DoctorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderList() {
    const { toDoctorDetail, details } = this.props;
    return (details.content || [])
      .filter(({ status }) => {
        return status == 1;
      })
    .map(({ id, realName, hospitalName, title, icon, isRecommend }, index) => {
      return (<ListItem
        key={index}
        className="borderBottom"
        arrow="horizontal"
        align="middle"
        multipleLine
        onClick={() => { toDoctorDetail(id); }}
      >
        <div className="doctorContent">
          <img src={require('assets/head.png')} alt="加载失败" />
          <div>
            <div>{realName}{isRecommend ? <span className="tagItem">推荐</span> : null}</div>
            <Brief>{hospitalName} | {title}</Brief>
          </div>
        </div>
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

export default DoctorList;
