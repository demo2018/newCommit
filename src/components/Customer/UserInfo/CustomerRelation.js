import { List, Button, Picker } from 'antd-mobile';
import styles from './index.less';

const ListItem = List.Item;

class CustomerRelation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realitions: props.datas,
      relationShip: [
        {
          label: '夫妻',
          value: 0,
        },
        {
          label: '母女',
          value: 1,
        },
        {
          label: '父女',
          value: 2,
        },
        {
          label: '母子',
          value: 3,
        },
        {
          label: '父子',
          value: 4,
        },
        {
          label: '兄弟姐妹',
          value: 5,
        },
        {
          label: '朋友',
          value: 6,
        },
        {
          label: '同事',
          value: 7,
        },
        {
          label: '亲戚',
          value: 8,
        },
        {
          label: '其他',
          value: 9,
        }
      ],
      cols: 1,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('datas' in nextProps && nextProps.datas !== this.props.datas) {
      this.setState({ realitions: nextProps.datas });
    }
  }
  renderList() {
    const { realitions } = this.state;
    const { toUpdateRelation } = this.props;
    return (realitions || []).map(({ id, relationId, realName, relation }, index) => {
      return (
        <Picker
          data={this.state.relationShip}
          cols={this.state.cols}
          value={relation ? [relation] : [0]}
          disabled
          key={index}
        >
          <ListItem
            arrow="horizontal"
            className="relationName borderBottom"
            onClick={() => toUpdateRelation(id, relationId)}
          >
            {realName}
          </ListItem>
        </Picker>
      );
    });
  }
  render() {
    const { toAddRelation } = this.props;
    return (
      <div className={styles.userInformation}>
        <List className="my-list">
          <ListItem className="my-listhead relation borderBottom">关系成员
            <Button onClick={toAddRelation}>+添加</Button>
          </ListItem>
          {this.renderList()}
        </List>
      </div>
    );
  }
}

export default CustomerRelation;
