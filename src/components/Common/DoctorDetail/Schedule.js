
import { Modal } from 'antd-mobile';
import Calendar from 'components/Common/Calendar';

const getDateFromDate = (datetime = {}) => {
  const { content = [] } = datetime;
  const able = content
    .filter(({ status }) => {
      return status == 0;
    })
    .map(({ date }) => {
      return date;
    });
  const unable = content
    .filter(({ status }) => {
      return status == 1;
    })
    .map(({ date }) => {
      return date;
    });
  return {
    ...datetime,
    able,
    unable,
  };
};

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: getDateFromDate(props.dateTime),
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('dateTime' in nextProps && nextProps.dateTime !== this.props.dateTime) {
      this.setState({ date: getDateFromDate(nextProps.dateTime) });
    }
  }

  render() {
    const { toDoctorAppoint, details: { id } } = this.props;
    const { date } = this.state;
    const calendarProps = {
      ableDates: date.able,
      disableDates: date.unable,
      // 可预约触发函数
      onSelectUsable() {
        toDoctorAppoint(id);
      },
      // 约满触发函数
      onSelectWarning() {
        Modal.alert('提示', '当天已经约满，请改约其他时间', [
          { text: '确定' },
        ]);
      },
    };

    return (<div className="schedule borderBottom borderTop">
      <div className="head"><p className="title">出诊安排</p></div>
      <div className="content">
        <Calendar {...calendarProps} />
        {/* <Calendar
          visible
          type={'one'}
          initalMonths={2}
          renderHeader={() => { return ''; }}
          minDate={minDate}
          maxDate={maxDate}
        /> */}
      </div>
    </div>);
  }
}

export default Schedule;
