import { List, Picker, InputItem, Tag, Menu } from 'antd-mobile';

const getDetailFrom = (details = {}) => {
  const { departments, title, } = details;
  return {
    ...details,
    title: [Number(title)],  //  将获取到的职称type转为number
    // departments: departments.join(','),
    // departments: Array.from(departments),
  };
};

//  渲染可选科室
const getTitleFromData = (partment = {}) => {
  const { content = [] } = partment;
  const pickerOptions = content
    .filter(({ type }) => {
      return type == 1;
    })
    .map(({ id, className }) => {
      return {
      value: id,
      label: className,
    };
  });

  return {
    ...partment,
    pickerOptions,
  };
};

// 擅长
const getGoodFromData = (partment = {}) => {
  const { name, content = [] } = partment;
  const pickerGood = content.map(({ id, name }) => {
    return {
      value: id,
      label: name,
    };
  });
  return {
    ...partment,
    pickerGood,
  };
};

const ListItem = List.Item;

class ProfessionalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [
        {
          label: '医师',
          value: 0,
        },
        {
          label: '医师啊',
          value: 1,
        },
        {
          label: '医师啊啊',
          value: 2,
        },
      ],
      show: false,
      showGoods: false,
      title: [],
      doctorInfo: getDetailFrom(props.details),
      depart: getTitleFromData(props.partment),
      goods: getGoodFromData(props.goodat),
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ doctorInfo: getDetailFrom(nextProps.details) });
    }
    if ('partment' in nextProps && nextProps.partment !== this.props.partment) {
      this.setState({ depart: getTitleFromData(nextProps.partment) });
    }
    if ('goodat' in nextProps && nextProps.goodat !== this.props.goodat) {
      this.setState({ goods: getGoodFromData(nextProps.goodat) });
    }
  }

  //  确认科室
  onPartmentOk = (key) => {
    const { doctorInfo, depart } = this.state;
    const { changeInfo } = this.props;
    const { pickerOptions } = depart;
    const pick = (pickerOptions.map(({ value }) => {
      return value == key;
    }) || {}).label;
    console.log(pick);
    changeInfo({ doctorInfo: { ...doctorInfo, departments: key ? [pick] : null, title: `${doctorInfo.title[0]}` } });
  }

  // 确认擅长
  onAdeptsOk = (label) => {
    const { doctorInfo } = this.state;
    const { changeInfo } = this.props;
    this.onCancel();
    changeInfo({ doctorInfo: { ...doctorInfo, adepts: [`${label}`] } });
  }
  onCancel = () => {
    this.setState({ show: false });
    this.setState({ showGoods: false });
  }

  //  选择科室
  handleClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    e.stopPropagation();
    this.setState({
      show: !this.state.show,
    });
  }

  // 选择擅长
  handleGoodsClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    e.stopPropagation();
    this.setState({
      showGoods: !this.state.showGoods,
    });
  }
  handleChange(key) {
    return (value) => {
      const { changeInfo } = this.props;
      const { doctorInfo } = this.state;
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ doctorInfo: { ...doctorInfo, [key]: value } });

      //  解决无法实时更新，每次切换只获取到上一次值的BUG
      if (key == 'title') {
        changeInfo({ ...doctorInfo, title: `${value[0]}`, hospitalName: doctorInfo.hospitalName, workYear: doctorInfo.workYear });
      } else if (key == 'hospitalName') {
        changeInfo({ ...doctorInfo, title: `${doctorInfo.title[0]}`, hospitalName: value, });
      } else if (key == 'workYear') {
        changeInfo({ ...doctorInfo, title: `${doctorInfo.title[0]}`, workYear: value });
      } else {
        changeInfo({ ...doctorInfo, title: `${doctorInfo.title[0]}` });
      }
    };
  }

  render() {
    const { doctorInfo, depart, goods } = this.state;
    const { pickerOptions } = depart;
    const { pickerGood } = goods;
    const { show, showGoods } = this.state;

    //   科室多选菜单
    const menuDepart = (
      <Menu
        className="single-multi-foo-menu"
        data={pickerOptions}
        level={1}
        onOk={this.onPartmentOk}
        onCancel={this.onCancel}
        height={document.documentElement.clientHeight * 0.4}
        multiSelect
      />
    );

    // 擅长多选菜单
    const menuGood = (
      <Menu
        className="single-multi-foo-menu"
        data={pickerGood}
        level={1}
        onOk={this.onAdeptsOk}
        onCancel={this.onCancel}
        height={document.documentElement.clientHeight * 0.4}
        multiSelect
      />
    );
    return (
      <div className="professionalInfo">
        {/* 执业信息 */}
        <List className="my-list">
          <ListItem className="my-listhead borderBottom">执业信息</ListItem>
          {/* 输入执业地点 */}
          <InputItem
            className="borderBottom"
            type="text"
            placeholder="请输入"
            value={doctorInfo.hospitalName}
            onChange={this.handleChange('hospitalName')}
          >执业地点</InputItem>
          {/* 科室 */}
          <List.Item
            className="borderBottom"
            arrow="horizontal"
            extra={doctorInfo.departments}
            onClick={this.handleClick}
          >科室</List.Item>
          {show ? menuDepart : null}
          {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
          {/* 职称 */}
          <Picker
            data={this.state.titles}
            cols={1}
            value={doctorInfo.title}
            onChange={this.handleChange('title')}
          >
            <List.Item className="borderBottom" arrow="horizontal" >职称</List.Item>
          </Picker>
          {/* 擅长 */}
          <List.Item className="borderBottom" arrow="horizontal" onClick={this.handleGoodsClick} extra={doctorInfo.adepts}>擅长</List.Item>
          {showGoods ? menuGood : null}
          {showGoods ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
          {/* 执业年限 */}
          <InputItem
            className="year borderBottom"
            placeholder="请输入数字"
            onChange={this.handleChange('workYear')}
            value={doctorInfo.workYear}
            type="number"
            extra="年"
          >执业年限</InputItem>
        </List>
      </div>
    );
  }
}

export default ProfessionalInfo;
