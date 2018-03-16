import { List, InputItem, Button, Picker, TextareaItem, Menu } from 'antd-mobile';
import styles from './index.less';

const getDetailFrom = (details = {}) => {
  const { departments,title } = details;
  return {
    ...details,
    departments,
    title: [Number(title)],  //  将获取到的职称type转为number
  };
};

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

class DoctorProfessional extends React.Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
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
  onPartmentOk = (label) => {
    const { doctorInfo } = this.state;
    const { changeInfo } = this.props;
    this.onCancel();
    changeInfo({ doctorInfo: { ...doctorInfo, departments: label ? [`${label}`] : null } });
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
      const { doctorInfo } = this.state;
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ doctorInfo: { ...doctorInfo, [key]: value } });
       //  解决无法实时更新，每次切换只获取到上一次值的BUG
      if (key == 'title') {
        this.setState({ ...doctorInfo, title: `${value[0]}`, hospitalName: doctorInfo.hospitalName, workYear: doctorInfo.workYear });
      } else if (key == 'hospitalName') {
        this.setState({ ...doctorInfo, title: `${doctorInfo.title[0]}`, hospitalName: value, });
      } else if (key == 'workYear') {
        this.setState({ ...doctorInfo, title: `${doctorInfo.title[0]}`, workYear: value });
      } else {
        this.setState({ ...doctorInfo, title: `${doctorInfo.title[0]}` });
      }
    };
  }
  handleSubmit() {
    const { toSeniority, changeInfo } = this.props;
    const { doctorInfo } = this.state;
    changeInfo({ ...doctorInfo, title: `${doctorInfo.title[0]}` });
    toSeniority();
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
        height={document.documentElement.clientHeight * 0.42}
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
        height={document.documentElement.clientHeight * 0.42}
        multiSelect
      />
    );
    return (
      <div className={styles.doctorProfessional}>
        <div className="head borderBottom">
          <img src={require('images/professional.png')} alt="" />
        </div>
        <div className="basicInfo borderTop">
          <p>执业信息</p>
          <List>
            <InputItem
              placeholder="请输入"
              value={doctorInfo.hospitalName}
              onChange={this.handleChange('hospitalName')}
            >执业地点</InputItem>

            <List.Item
              value={doctorInfo.departments}
              onClick={this.handleClick}
            >科室</List.Item>
              {show ? menuDepart : null}
              {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}


            <Picker
              data={this.state.titles}
              cols={1}
              value={doctorInfo.title}
              onChange={this.handleChange('title')}
            >
              <List.Item className="borderBottom" >职称</List.Item>
            </Picker>

            {/* 擅长 */}
            <List.Item className="borderBottom" onClick={this.handleGoodsClick} extra={doctorInfo.adepts}>擅长</List.Item>
            {showGoods ? menuGood : null}
            {showGoods ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}

            <InputItem
              className="workYear"
              placeholder="请输入数字"
              extra="年"
              onChange={this.handleChange('workYear')}
              value={doctorInfo.workYear}
            >执业年限</InputItem>
          </List>
        </div>
        <div className="moreInfo borderBottom borderTop">
          <p className="doctor-intro borderBottom">简介</p>
          <TextareaItem
            rows={5}
            count={200}
            placeholder="请输入内容"
            defaultValue={doctorInfo.intro}
            onChange={this.handleChange('intro')}
          />
        </div>

        <Button type="primary" className="submit" onClick={this.handleSubmit}>下一步</Button>
      </div>
    );
  }
}

export default DoctorProfessional;
