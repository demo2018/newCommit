import { List, Button, InputItem, Picker, Toast } from 'antd-mobile';
import styles from './index.less';

const getDetailByStates = (details = {}) => {
  const { gender, relation } = details;
  return {
    ...details,
    gender: [gender], // picker组件接受的是数组
    relation: [relation], // picker组件接受的是数组
  };
};
class AddRelation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '添加关系成员',
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
      sex: [
        {
          label: '女',
          value: 0,
        },
        {
          label: '男',
          value: 1,
        },
      ],
      cols: 1,
      gender: [],
      relation: [],
      relationInfo: getDetailByStates(props.details),
    };
    document.title = this.state.title;
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ relationInfo: getDetailByStates(nextProps.details) });
    }
  }
  // 提交时根据是否含有id判断操作为新增还是更新
  onSubmit() {
    const { addRelation, upDateRelation } = this.props;
    const { relationInfo } = this.state;
    const { gender, relation, age, phone } = relationInfo;
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (relationInfo != null && gender[0] != null && relation[0] != null && age != null) {
      if (phone && !reg.test(phone)) {
        Toast.info('手机号格式有误', 1);
        return false;
      }
      if (relationInfo.id) {
        upDateRelation({ ...relationInfo, gender: gender[0], relation: relation[0] });
      } else {
        addRelation({ ...relationInfo, gender: gender[0], relation: relation[0] });
      }
    } else {
      Toast.info('请填写相应内容');
    }
  }
  // 切换下拉框值
  handleChange(key) {
    return (value) => {
      const { relationInfo } = this.state;
      if (value[0] == undefined) {  // 修复不滑动下拉框时点击确认无法取值问题
        value[0] = 0;
      }
      if (value.target) {
        value = value.target.value;
      }

      this.setState({ relationInfo: { ...relationInfo, [key]: value } });
    };
  }
  render() {
    const { relationInfo } = this.state;
    return (
      <form className={styles.addRelation}>
        <List>

          <InputItem
            placeholder="为方便就诊，请输入真实姓名"
            className="borderBottom"
            value={relationInfo.realName}
            onChange={this.handleChange('realName')}
          >姓名</InputItem>

          <Picker
            data={this.state.relationShip}
            cols={this.state.cols}
            value={relationInfo.relation}
            onChange={this.handleChange('relation')}
          >
            <List.Item onClick={this.onClick} className="borderBottom">关系</List.Item>
          </Picker>

          <Picker
            data={this.state.sex}
            cols={this.state.cols}
            value={relationInfo.gender}
            onChange={this.handleChange('gender')}
          >
            <List.Item onClick={this.onClick} className="borderBottom">性别</List.Item>
          </Picker>

          <InputItem
            className="borderBottom"
            placeholder="请输入数字"
            value={relationInfo.age}
            onChange={this.handleChange('age')}
          >年龄</InputItem>

          <InputItem
            className="borderBottom"
            placeholder="（非必填项）"
            value={relationInfo.phone}
            onChange={this.handleChange('phone')}
          >手机号码</InputItem>

        </List>

        <Button type="primary" size="large" onClick={() => { this.onSubmit(); }}>确定</Button>
      </form>);
  }
}

export default AddRelation;
