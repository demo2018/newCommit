
import { Tag } from 'antd-mobile';
import styles from './index.less';
// const CheckableTag = Tag.CheckableTag;

const topTooth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const bottomTooth = [41, 42, 43, 44, 45, 46, 47, 48, 31, 32, 33, 34, 35, 36, 37, 38];
const noop = function () { };

class ToothPicker extends React.Component {
  static defaultProps = {
    onChange: noop,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || []
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(tag) {
    return (checked) => {
      const { value = [] } = this.state;
      const newValue = checked ?
        [...value, tag] :
        value.filter(t => t !== tag);

      this.setState({ value: newValue }, () => {
        this.triggerChange();
      });
    };
  }
  triggerChange() {
    const { value } = this.state;
    this.props.onChange(value);
  }
  renderTooth(tooth) {
    const { value } = this.state;
    return tooth.map((key) => {
      return (
        <Tag
          key={key}
          checked={value.indexOf(key) > -1}
          onChange={this.handleChange(key)}
        >
          {key}
        </Tag>
      );
    });
  }
  render() {
    return (
      <div className={styles.toothPicker}>
        <div className="topToothWrapper">
          {this.renderTooth(topTooth)}
        </div>

        <div className="bottomToothWrapper">
          {this.renderTooth(bottomTooth)}
        </div>
      </div >
    );
  }
}

export default ToothPicker;
