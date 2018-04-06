import { List } from 'antd-mobile';
import { getServer } from 'utils/common';

const ListItem = List.Item;
const Brief = ListItem.Brief;

class DoctorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderList() {
    const { toDoctorDetail, details } = this.props;
    const { medical } = getServer();
    return (details.content || [])
      .map(({ id, realName, hospitalName, education, icon, isRecommend }, index) => {
        return (<ListItem
          key={index}
          className="borderBottom"
          arrow="horizontal"
          align="middle"
          multipleLine
          onClick={() => { toDoctorDetail(id); }}
        >
          <div className="doctorContent">
          {
            icon
              ? <img src={`${medical}/bhyy/core/image/${icon}`} alt="加载失败" />
              : <img src={require('assets/head.png')} alt="加载失败" />
          }
          <div>
            <div>{realName}{isRecommend ? <span className="tagItem">推荐</span> : null}</div>
            <Brief>{hospitalName} | {education}</Brief>
          </div>
        </div>
      </ListItem>);
      })
      ;
  }
  render() {
    const { details } = this.props;
    return (
      <div>
        {
          details.content && details.content[0]
            ? <List><div>{this.renderList()}</div> </List>
            : <p className="noDoctor">暂无医生</p>
        }
      </div>
    );
  }
}

export default DoctorList;
