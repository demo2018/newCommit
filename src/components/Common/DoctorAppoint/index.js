import { Button, List, Tag, Picker, Toast } from 'antd-mobile';
import styles from './index.less';
import { getServer } from 'utils/common';
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
  0: ' 周日',
};
const timePeriod = {
  0: ' 上午',
  1: ' 下午',
};

const timebuck = [
  {
    value: 0,
    lable: '上午',
  }, {
    value: 1,
    lable: '下午',
  }
];

const now = new Date().getTime();
const getStateByProps = (details = []) => {
  const { date } = details;
  const pickerOptions = (details || [])
    .filter(({ date }) => {
      const ableTime = new Date(date).getTime();
      if (ableTime > now) {
        return date;
      }
    })
    .map(({ id, date, dayOfWeek }) => {
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
    const { details } = this.state;
    const { times } = this.props;

    //  从添加关系或新增姓名页面回退时显示之前选择的已保存信息
    const patient = parseInt(localStorage.getItem('patientId'));
    const bucket = parseInt(localStorage.getItem('timeBucket'));
    const items = parseInt(localStorage.getItem('itemClassId'));
    const config = parseInt(localStorage.getItem('doctorConfigId'));
    const chosenTime = (times || [])
      .filter(({ date, id }) => {
        if (config) {
          return id == config;
        } else {
          localStorage.setItem('doctorConfigId', this.state.Id);
          return new Date(date).getTime() == new Date(localStorage.getItem('chooseDate')).getTime();
        }
      })
      .map(({ id, date, dayOfWeek }) => {
        return {
          value: id,
          label: date + (weekZn[dayOfWeek] || ''),
        };
      });
    if (patient || bucket || items) {
      this.setState({ details: { ...details, patinetChoose: patient, bucketChoose: bucket, itemchoose: items } });
    }
    this.setState({ Id: chosenTime[0] ? chosenTime[0] && chosenTime[0].value : '' });
  }
  // 下拉时更换需保存的值
  handleChange(key) {
    return (value) => {
      const { details } = this.state;
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ details: { ...details, [key]: value } });
      localStorage.setItem([key], value);
    };
  }
  //  tag change
  handleTagChange(key, index) {
    return (selected) => {
      const { details } = this.state;
      this.setState({ details: { ...details, [key]: selected ? index : undefined } });
      localStorage.setItem([key], selected ? index : null);
    };
  }

  //   点击添加预约
  handleAddRelation() {
    const { addAppoint, times, toResult } = this.props;
    const doctorConfigId = parseInt(localStorage.getItem('doctorConfigId'));
    const patientId = parseInt(localStorage.getItem('patientId'));
    const timeBucket = parseInt(localStorage.getItem('timeBucket'));
    const itemClassId = parseInt(localStorage.getItem('itemClassId'));

    const pickerOptions = times
      .map(({ id, date, dayOfWeek }) => {
        return {
          value: id,
          label: date + (weekZn[dayOfWeek] || ''),
        };
      });
    // 回传给后台的时间参数：拼接日期及时间段
    const time = (pickerOptions.find(({ value }) => {
      return value === doctorConfigId;
    }) || {}).label.slice(0, 10) + timePeriod[timeBucket];
    if (patientId != null && itemClassId != null && timeBucket != null && time != null) {
      addAppoint({ patientId, itemClassId, doctorConfigId, timeBucket, time });
      toResult();
      localStorage.removeItem('timeBucket');
      localStorage.removeItem('itemClassId');
      localStorage.removeItem('patientId');
      localStorage.removeItem('doctorConfigId');
    } else {
      Toast.info('以上内容不能留空');
    }
  }

  render() {
    const { toAppointOther, projects, relations, toUserName, doctorInfo, times = [] } = this.props;
    const doctorId = this.props.id;
    const { details, Id } = this.state;
    const { medical } = getServer();
    const { itemClassId, timeBucket, patientId, patinetChoose, bucketChoose, itemchoose } = details;

    const pickerOptions = times.filter(({ date }) => {
      const ableTime = new Date(date).getTime();
      if (ableTime > now) {
        return date;
      }
    })
      .map(({ id, date, dayOfWeek }) => {
        return {
          value: id,
          label: date + (weekZn[dayOfWeek] || ''),
        };
      });
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
              {
                doctorInfo && doctorInfo.icon
                  ? <img src={`${medical}/bhyy/core/image/${doctorInfo.icon}`} alt="" />
                  : <img src={require('assets/head.png')} alt="" />
              }
              <div>
                <div className="doctor-name">{doctorInfo.realName}</div>
                <Brief>{doctorInfo.hospitalName} | {doctorInfo.education}</Brief>
              </div>
            </div>
          </ListItem>

          {/* // 就诊时间 */}
          <Picker
            data={pickerOptions}
            cols={1}
            value={details.doctorConfigId ? details.doctorConfigId : [Id]}
            onChange={this.handleChange('doctorConfigId')}
          >
            <List.Item
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
                timebuck.map(({ value, lable }) => {
                  return (<Tag
                    key={value}
                    selected={timeBucket != null ? timeBucket === value : value === bucketChoose}
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
                  .filter(({ type, id }) => {
                    return type == 1 && (doctorInfo.serviceItems.includes(id) || doctorInfo.serviceItems.includes(`${id}`));
                  })
                  .map(({ className, id }, index) => {
                    return (<Tag
                      key={index}
                      selected={itemClassId ? itemClassId === id : id === itemchoose}
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
                className="inputName patient"
              >就诊人 </ListItem>
              : <ListItem
                align="middle"
                multipleLine
                className="patient"
              >
                <div className="tag-container">
                  <span className="ofPatient ofProject">就诊人</span>
                  <div className="projectWrap">
                    <Tag
                      selected={!patientId && patinetChoose == cookie.get('id') ? cookie.get('id') : (patientId == cookie.get('id') ? cookie.get('id') : null)}
                      onChange={this.handleTagChange('patientId', cookie.get('id'))}
                    >
                      {cookie.get('realName')}
                    </Tag>
                    {
                      (relations || []).map(({ id, realName }) => {
                        return (<Tag
                          key={id}
                          selected={patientId ? patientId === id : id === patinetChoose}
                          onChange={this.handleTagChange('patientId', id)}
                        >{realName}</Tag>);
                      })
                    }
                  </div>
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
