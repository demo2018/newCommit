import { List, InputItem, Button, Picker, TextareaItem, Menu } from 'antd-mobile';
import styles from './index.less';

const getDetailFrom = (details = {}) => {
  const { adepts = [], education } = details;
  const allPart = JSON.parse(localStorage.getItem('adepts')); // 擅长列表 为什么从localStorage取？ 后端返回了
  const selectedPart = adepts;// 已选中的擅长
  const partNames = allPart
    .filter(({ value }) => {
      return selectedPart.includes(value) || selectedPart.includes(`${value}`);
    })
    .map(({ label }) => {
      return label;
    });
  return {
    ...details,
    education: [education],
    adepts: adepts.map((key) => {
      return window.parseInt(key);
    }),
    partNames: partNames.join('，'),
  };
};

const getTitleFromData = (partment = {}) => {
  const { content = [] } = partment;
  //  从后台获取
  // const pickerOptions = content
  //   .filter(({ type }) => {
  //     return type == 1;
  //   })
  //   .map(({ id, className }) => {
  //     return {
  //       value: id,
  //       label: className,
  //     };
  //   });
  // 固定科室
  const pickerOptions = [
    { label: '内科', value: '内科' },
    { label: '外科', value: '外科' },
    { label: '种植科', value: '种植科' },
    { label: '正畸科', value: '正畸科' },
    { label: '修复科', value: '修复科' },
    { label: '综合科', value: '综合科' },
    { label: '牙周科', value: '牙周科' },
    { label: '儿童口腔科', value: '儿童口腔科' },
  ];
  return {
    ...partment,
    pickerOptions,
  };
};


// 擅长
const getGoodFromData = (partment = {}) => {
  const { content = [] } = partment;
  //  从后台获取擅长
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
      educations: [
        {
          label: '研究生',
          value: '研究生',
        },
        {
          label: '博士',
          value: '博士',
        },
        {
          label: '硕士',
          value: '硕士',
        },
        {
          label: '本科',
          value: '本科',
        },
        {
          label: '专科',
          value: '专科',
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
  onPartmentOk = (key) => {
    const { doctorInfo } = this.state;
    const { changeInfo } = this.props;
    const { adepts } = doctorInfo;
    this.onCancel();
    changeInfo({
      ...doctorInfo,
      title: `${doctorInfo.title[0]}`,
      hospitalName: doctorInfo.hospitalName,
      workYear: doctorInfo.workYear,
      departments: key,
      // adepts: adepts && adepts.split('，')
    });
  }

  // 确认擅长
  onAdeptsOk = (key) => {
    const { doctorInfo } = this.state;
    const { changeInfo } = this.props;
    const { departments } = doctorInfo;
    this.onCancel();

    changeInfo({
      ...doctorInfo,
      title: `${doctorInfo.title[0]}`,
      hospitalName: doctorInfo.hospitalName,
      workYear: doctorInfo.workYear,
      // departments: departments && departments.split('，'),
      adepts: key
    });
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
      if (key == 'hospitalName') {
        this.setState({ ...doctorInfo, hospitalName: value, });
      } else if (key == 'workYear') {
        this.setState({ ...doctorInfo, workYear: value });
      } else if (key == 'education') {
        this.setState({ ...doctorInfo, education: value[0] });
      } else {
        this.setState({ ...doctorInfo });
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
          <img src={require('images/professional.jpg')} alt="" />
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
              extra={doctorInfo.departments}
              onClick={this.handleClick}
              extra={doctorInfo.departments && doctorInfo.departments.join('，')}
            >科室</List.Item>
            {show ? menuDepart : null}
            {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}


            {/* 学历 */}
            <Picker
              data={this.state.educations}
              cols={1}
              value={doctorInfo.education}
              onChange={this.handleChange('education')}
            >
              <List.Item className="borderBottom" arrow="horizontal" >学历</List.Item>
            </Picker>

            {/* 擅长 */}
            <List.Item
              className="borderBottom"
              onClick={this.handleGoodsClick}
              extra={doctorInfo.partNames}
            >擅长</List.Item>
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
