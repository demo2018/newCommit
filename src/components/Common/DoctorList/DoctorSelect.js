import DropDownPicker from 'components/Common/DropDownPicker';

// 擅长
const getGoodFromData = (partment = {}) => {
  const { content = [] } = partment;
  //  从后台获取服务项目
  const pickerService = content
  .filter(({ type, status }) => {
    return type == 1 && status == 1;
  })
  .map(({ id, className }) => {
    return {
      value: id,
      label: className,
    };
  });
  return {
    ...partment,
    pickerService,
  };
};

class DoctorSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: getGoodFromData(props.servicesItem),
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('servicesItem' in nextProps && nextProps.servicesItem !== this.props.servicesItem) {
      this.setState({ services: getGoodFromData(nextProps.servicesItem) });
    }
  }
  render() {
    const { services } = this.state;
    const { choose, fetchSelectList, fetchSearchList, search } = this.props;
    const { pickerService } = services;
    const doctorPickerProps = {
      multiple: false, // 新增参数，是否多选
      // value: isRecommend,
      title: '全部医生',
      menus: [
        { label: '全部医生', value: 0 },
        { label: '推荐医生', value: 1 },
      ],
      onSelect: (item) => {
        if (item == 1) {
          fetchSelectList({ ...choose, isRecommend: item[0] });
        } else {
          if (choose.isRecommend) {
            delete choose.isRecommend;
          }
          fetchSelectList({ ...choose });
        }
      }
    };
    const projectPickerProps = {
      multiple: false,
      title: '不限项目',
      menus: [{ label: '不限项目', value: 0 }, ...pickerService],
      onSelect: (item) => {
        if (item == 0) {
          fetchSearchList({ ...search, itemName: '' });
        } else {
          fetchSearchList({ ...search, itemName: item[0] });
        }
      }
    };
    const datePickerProps = {
      multiple: true,
      title: '出诊时间',
      menus: [
        { label: '全部时间', value: -1 }, // 这里强耦合，必须是value -1,
        { label: '周一', value: 1 },
        { label: '周二', value: 2 },
        { label: '周三', value: 3 },
        { label: '周四', value: 4 },
        { label: '周五', value: 5 },
        { label: '周六', value: 6 },
        { label: '周日', value: 7 },
      ],
      onSave: (item) => {
        const checked = [];
        for (let index = 0; index < item.length; index++) {
          checked[index] = parseInt(item[index]);
        }
        if (item[0] == -1) {   // 选中全部时间时，从item中删除-1
          fetchSearchList({ ...search, dayOfWeek: checked.splice(1, 8) });
        } else {
          fetchSearchList({ ...search, dayOfWeek: checked });
        }
      }
    };
    return (
      <div className="select borderBottom" style={{ display: 'flex', margin: '0 0 -1px 0 ' }}>
        <DropDownPicker {...doctorPickerProps} />
        <DropDownPicker {...projectPickerProps} />
        <DropDownPicker {...datePickerProps} />
      </div>
    );
  }
}


export default DoctorSelect;

