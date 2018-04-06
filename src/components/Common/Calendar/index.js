import moment from 'moment';
import classnames from 'classnames';
import './index.less';
/**
 *  这里只展示了 当前周与未来两周
 */

const formatStr = 'YYYY-MM-DD';
const noop = function () { };

// 获取当前日期
const getCurrentDate = () => {
  return moment(moment().format(formatStr)); // 去掉moment默认时间带时分秒
};

// 获取开始时间
const getStartDate = () => {
  const currentDate = getCurrentDate();
  const dayOfWeek = currentDate.day();
  return currentDate.subtract(dayOfWeek + 1, 'days');
};

// 获取截止时间 2weeks
const getEndDate = () => {
  const currentDate = getCurrentDate();
  const leftOfWeek = 7 - currentDate.day();
  return currentDate.add(2 * 7 + leftOfWeek, 'days');
};

// 查找时间
const findDate = (dates = [], date) => {
  return dates.find((dateItem) => {
    return moment(moment(dateItem).format(formatStr)).isSame(date);
  });
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderWeekHeader() {
    const weekInfos = ['日', '一', '二', '三', '四', '五', '六'];
    return (<div className="weekHeader">
      {weekInfos.map((weekKey, index) => {
        return <div key={index} className="cell">{weekKey}</div>;
      })}
    </div>);
  }
  renderWeekBody(weekDays = []) {
    return (<div className="cell">
      {weekDays.map(this.renderDay)}
    </div>);
  }
  renderDay(day, index) {
    const { ableDates = [], disableDates = [], onSelectUsable = noop, onSelectWarning = noop } = this.props;
    const currentDate = getCurrentDate();
    const endDate = getEndDate();
    const isAbled = (day.isAfter(currentDate) || day.isSame(currentDate)) && day.isBefore(endDate);

    const dateSelected = findDate(ableDates, day);
    const dateWarning = findDate(disableDates, day);
    const isToday = moment().isSame(day, 'day');
    const info = ((isToday && '今天') || dateSelected && '可约') || (dateWarning && '约满');

    const handleClick = () => {
      if (dateSelected) {
        onSelectUsable(day.format(formatStr));
      }
      if (dateWarning) {
        onSelectWarning(day.format(formatStr));
      }
    };

    const date = day.toDate().getDate();
    return (<div
      key={index}
      className={classnames('cell', {
        'cell-today': isToday,
        'cell-selected': dateSelected,
        'cell-warning': dateWarning,
      })}
    >
      <span className={classnames('date', { grey: !isAbled })} onClick={handleClick}>{date}</span>
      <span className="info">{info}</span>
    </div>);
  }
  renderWeekDay(startDate, key) {
    const days = [1, 2, 3, 4, 5, 6, 7];

    return (<div key={key} className="row">
      {days.map((day, index) => {
        const date = moment(startDate).add(day, 'days');
        return this.renderDay(date, index);
      })}
    </div>);
  }
  renderMonthBody() {
    const weeks = [1, 2, 3];
    const startDate = getStartDate();

    return (<div className="month">
      {weeks.map((item, index) => {
        const weekStartDate = moment(startDate).add((item - 1) * 7, 'days');
        return this.renderWeekDay(weekStartDate, index);
      })}
    </div>);
  }
  render() {
    return (<div className="calendarWrapper">
      {this.renderWeekHeader()}
      <div>
        {this.renderMonthBody()}
      </div>
    </div>);
  }
}


export default Calendar;
