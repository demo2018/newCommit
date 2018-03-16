import { Button, List, Tag, Picker, Toast } from 'antd-mobile';
import styles from './index.less';
import cookie from 'js-cookie';

const ListItem = List.Item;
const Brief = ListItem.Brief;

const weekZn = {
  1: ' 周一',
  2: ' 周二',
  3: ' 周三',
  4: ' 周四',
  5: ' 周五',
  6: ' 周六',
  7: ' 周日',
};

const times = [
  {
    value: 0,
    lable: '上午',
  }, {
    value: 1,
    lable: '下午',
  }
];

const getStateByProps = (details = {}) => {
  const { date, content = [] } = details; // 设置默认为空数组，否则遍历肯定要报错
  const pickerOptions = content.map(({ id, date, dayOfWeek }) => {
    return {
      value: id,
      label: date + (weekZn[dayOfWeek] || ''),
    };
  });
  return {
    ...details,
    date: date ? [date] : [],
    pickerOptions,
  };
};

class DoctorAppoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '预约信息',
      details: getStateByProps(props.times),
    };
    document.title = this.state.title;
    this.handleAddRelation = this.handleAddRelation.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if ('times' in nextProps && nextProps.times !== this.props.times) {
      this.setState({ details: getStateByProps(nextProps.times) });
    }
  }
  // 下拉时更换需保存的值
  handleChange(key) {
    return (value) => {
      const { details } = this.state;
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ details: { ...details, [key]: value } });
    };
  }
  //  tag change
  handleTagChange(key, index) {
    return (selected) => {
      const { details } = this.state;
      this.setState({ details: { ...details, [key]: selected ? index : undefined } });
    };
  }

  //   点击添加预约
  handleAddRelation() {
    const { addAppoint } = this.props;
    const { details } = this.state;
    const { pickerOptions, doctorConfigId, patientId, timeBucket, itemClassId } = details;
    const time = (pickerOptions.find(({ value }) => {
      return value === (doctorConfigId && doctorConfigId[0]);
    }) || {}).label;
    if (patientId != null && itemClassId != null && timeBucket != null && time != null) {
      addAppoint({ patientId, itemClassId, doctorConfigId: doctorConfigId && doctorConfigId[0], timeBucket, time });
    } else {
      Toast.info('以上内容不能留空');
    }
  }

  render() {
    const { toAppointOther, projects, relations, toUserName, doctorInfo } = this.props;
    const doctorId = this.props.id;
    const { details } = this.state;
    const { pickerOptions, itemClassId, timeBucket, patientId, } = details;
    return (
      <div className={styles.doctorAppoint}>
        <List>

          {/* //医生详情 */}
          <ListItem
            align="middle"
            multipleLine
            className="borderBottom appointHead"
          >
            <div className="appointContent">
              <img src={require('assets/head.png')} />
              <div>
                <div className="doctor-name">{doctorInfo.realName}</div>
                <Brief>{doctorInfo.hospitalName} | {doctorInfo.title}</Brief>
              </div>
            </div>
          </ListItem>

          {/* // 就诊时间 */}
          <Picker
            data={pickerOptions}
            cols={1}
            value={details.doctorConfigId}
            onChange={this.handleChange('doctorConfigId')}
          >
            <List.Item
              onClick={this.onClick}
              className="chooseTime borderBottom"
              arrow="horizontal"
            >就诊时间</List.Item>
          </Picker>

          {/* //  时间段 */}
          <ListItem
            align="middle"
            multipleLine
            className="borderBottom"
          >
            <div className="tag-container">
              <span className="ofPeriod">时间段</span>
              {
                times.map(({ value, lable }) => {
                  return (<Tag
                    key={value}
                    selected={timeBucket === value}
                    onChange={this.handleTagChange('timeBucket', value)}
                  >{lable}</Tag>);
                })
              }
            </div>
          </ListItem>


          {/* 选择项目 */}
          <ListItem
            align="middle"
            multipleLine
            className="borderBottom"
          >
            <div className="tag-container">
              <span className="ofProject">预约项目</span>
              <div className="projectWrap">
                {(projects.content || [])
                  .filter(({ type }) => {
                    return type == 1;
                  })
                  .map(({ className, id }, index) => {
                    return (<Tag
                      key={index}
                      selected={itemClassId === id}
                      onChange={this.handleTagChange('itemClassId', id)}
                    > {className}
                    </Tag>);
                  })}
              </div>
            </div>
          </ListItem>

          {/* 显示姓名或关系人  */}
          {
            !cookie.get('realName')
              ? <ListItem
                extra={<span className="customerName">真实姓名</span>}
                onClick={() => toUserName(doctorId)}
                className="inputName borderBottom"
              >就诊人 </ListItem>
              : <ListItem
                align="middle"
                multipleLine
                className="borderBottom"
              >
                <div className="tag-container">
                  <span className="ofPatient">就诊人</span>
                   <Tag
                     selected={patientId === cookie.get('id')}
                     onChange={this.handleTagChange('patientId', cookie.get('id'))}
                   >{cookie.get('realName')}</Tag>
                  {
                    (relations || []).map(({ id, realName }) => {
                      return (<Tag
                        key={id}
                        selected={patientId === id}
                        onChange={this.handleTagChange('patientId', id)}
                      >{realName}</Tag>);
                    })
                  }
                </div>
              </ListItem>
          }
          <ListItem className="forOther">
            <a onClick={() => toAppointOther(doctorId)}>为他人预约>></a>
          </ListItem>
        </List>
        <Button type="primary" size="large" onClick={this.handleAddRelation}>确认预约</Button>
      </div>
    );
  }
}

export default DoctorAppoint;
