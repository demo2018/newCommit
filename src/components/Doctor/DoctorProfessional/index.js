import { List, InputItem, Button, Picker, TextareaItem, Menu, Toast } from 'antd-mobile';
import styles from './index.less';
import { createForm } from 'rc-form';

const getDetailFrom = (details = {}) => {
  const { adepts = [], education } = details;
  const allPart = JSON.parse(localStorage.getItem('adepts')); // 擅长列表 为什么从localStorage取？ 后端返回了
  const selectedPart = (adepts || []);// 已选中的擅长
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
    adepts: (adepts || []).map((key) => {
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
  //  多选弹出后点击确认科室
  onPartmentOk = (key) => {
    const { doctorInfo } = this.state;
    const { changeInfo } = this.props;
    const { education } = doctorInfo;
    // 筛选点击key值的label
    // }, this);
    // for (let index = 0; index < pickerOptions.length; index++) {
    //   for (let k = 0; k < key.length; k++) {
    //     if (pickerOptions[index].value == key[k]) {
    //       pick += pickerOptions[index].label + ' ';
    //     }
    //   }
    //    })
    // }
    if (key.length > 3) {
      Toast.info('最多只可选择三项', 1);
    } else if (key.length < 1) {
      Toast.info('请至少选择一项', 1);
    } else {
      this.onCancel();

      changeInfo({
        hospitalName: doctorInfo.hospitalName,
        workYear: doctorInfo.workYear,
        departments: key,
        education: education[0],
      });
    }
  }

  // 多选弹出后点击确认擅长
  onAdeptsOk = (key) => {
    const { doctorInfo } = this.state;
    const { education } = doctorInfo;
    const { changeInfo } = this.props;
    if (key.length > 3) {
      Toast.info('最多只可选择三项', 1);
    } else {
      this.onCancel();
      changeInfo({
        ...doctorInfo,
        hospitalName: doctorInfo.hospitalName,
        workYear: doctorInfo.workYear,
        education: education[0],
        adepts: key
      });
    }
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
      if (key == 'hospitalName') {
        changeInfo({ hospitalName: value, });
      } else if (key == 'workYear') {
        changeInfo({ workYear: value });
      } else if (key == 'education') {
        changeInfo({ education: value[0] });
      } else if (key == 'intro') {
        changeInfo({ intro: value });
      } else {
        changeInfo({ ...doctorInfo });
      }
    };
  }
  handleSubmit() {
    const { toSeniority, changeInfo } = this.props;
    const { doctorInfo } = this.state;
    const { education } = doctorInfo;
    changeInfo({ ...doctorInfo, education: education[0] });
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
        value={doctorInfo.departments}
        level={1}
        onOk={this.onPartmentOk}
        onCancel={this.onCancel}
        height={document.documentElement.clientHeight * 0.5}
        multiSelect
      />
    );

    // 擅长多选菜单
    const menuGood = (
      <Menu
        className="single-multi-foo-menu"
        data={pickerGood}
        value={doctorInfo.adepts}
        level={1}
        onOk={this.onAdeptsOk}
        onCancel={this.onCancel}
        height={document.documentElement.clientHeight * 0.5}
        multiSelect
      />
    );
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.doctorProfessional}>
        <div className="head borderBottom">
          <img src={require('images/professional.jpg')} alt="" />
        </div>
        <div className="basicInfo borderTop">
          <p>执业信息</p>
          <List>
            {
              doctorInfo.hospitalName != null
                ? <InputItem
                  {...getFieldProps('hospital', {
                    initialValue: `${doctorInfo.hospitalName}`,
                  }) }
                  className="borderBottom"
                  type="text"
                  placeholder="请输入"
                  onBlur={this.handleChange('hospitalName')}
                >执业地点</InputItem>
                : <InputItem
                  {...getFieldProps('hospital') }
                  className="borderBottom"
                  type="text"
                  placeholder="请输入"
                  onBlur={this.handleChange('hospitalName')}
                >执业地点</InputItem>
            }


            <List.Item
              onClick={this.handleClick}
              extra={doctorInfo.departments && doctorInfo.departments.join('，')}
              placeholder="请选择"
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
          {
            doctorInfo.intro != null
              ? <TextareaItem
                {...getFieldProps('intro', {
                  initialValue: `${doctorInfo.intro}`,
                }) }
                autoHeight
                rows={0}
                count={200}
                placeholder="请输入内容"
                onBlur={this.handleChange('intro')}
              />
              : <TextareaItem
                {...getFieldProps('intro') }
                rows={1}
                count={200}
                placeholder="请输入内容"
                onBlur={this.handleChange('intro')}
              />
          }
        </div>

        <Button type="primary" className="submit" onClick={this.handleSubmit}>下一步</Button>
      </div>
    );
  }
}

export default createForm()(DoctorProfessional);
