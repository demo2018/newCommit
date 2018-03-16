import classnames from 'classnames';
import { Button, Checkbox, Icon } from 'antd-mobile';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import './index.less';
import '../../../styles/iconFont.less'; // 引入字体样式文件

const CheckboxItem = Checkbox.CheckboxItem;

/**
 * menus 下拉选项[{value:1,label:'张三'}]
 * value 选中的值[1]
 * placeholder  无值时展示文案
 * onSelect 选中事件 fn
 */

class DropDownPicker extends React.Component {
  static defaultProps = {
    multiple: false, // 是否多选
    menus: [], // 渲染列表
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
      visible: props.visible
    };
    this.onSelect = this.onSelect.bind(this);
    this.onVisibleChange = this.onVisibleChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value || [] });
    }
    if ('visible' in nextProps && nextProps.visible !== this.props.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }
  onVisibleChange(visible) {
    const { value, visible: oldVisible } = this.state;
    const { onSelect, onVisibleChange } = this.props;
    const newVisible = onVisibleChange ? onVisibleChange(visible) : visible;
    if (!newVisible) {
      this.setState({ visible: newVisible }, () => {
        onSelect && onSelect(value);
      });
    } else {
      this.setState({ visible: newVisible });
    }
  }
  onSelect({ selectedKeys }) {
    const { onSelect, multiple } = this.props;
    this.setState({ value: selectedKeys, visible: multiple }, () => {
      onSelect && onSelect(selectedKeys);
    });
  }
  handleSaveClick() {
    const { value } = this.state;
    const { onSave } = this.props;
    this.setState({ value, visible: false }, () => {
      onSave && onSave(value);
    });
  }
  renderArrow() {
    const { visible } = this.state;
    return !visible
      ? <span className="icon iconfont icon-todown"></span>
      : <span className="icon iconfont icon-toup"></span>;
  }
  renderValue() {
    const { title, menus = [], multiple } = this.props;
    const { value: valueChecked } = this.state;

    const valueDesc = menus.filter(({ value }) => {
      return valueChecked.indexOf(`${value}`) > -1;
    })
      .map(({ label }) => {
        return label;
      })
      .join(',');

    const triggerValue = multiple ? title : (valueDesc || title || '请选择');
    return (<div className="dropDownTrigger">
      <span className="valueLabel">{triggerValue} </span>
      {this.renderArrow()}
    </div>);
  }
  renderMenu() {
    const { multiple, menus = [] } = this.props;
    let { value = [] } = this.state;
    value = value.map((item) => {
      return `${item}`;
    });
    return (<Menu
      multiple={multiple}
      selectedKeys={value}
      onSelect={this.onSelect}
      onDeselect={this.onSelect}
    >
      {
        menus && menus.length
          ? menus.map(({ label, value: itemValue }) => {
            return (<MenuItem key={`${itemValue}`} >
              {
                multiple
                  ?
                  <CheckboxItem checked={value.indexOf(`${itemValue}`) > -1}>
                    {label}
                  </CheckboxItem>
                  : label
              }
            </MenuItem>);
          })
          : <MenuItem>暂无数据</MenuItem>
      }

      {
        menus && menus.length && multiple &&
        <MenuItem disabled>
          <Button
            className="dropDownBtn"
            type="primary"
            style={{
              margin: '0 16px',
              pointerEvents: 'visible',
            }}
            onClick={this.handleSaveClick}
          >确认</Button>
        </MenuItem>
      }
    </Menu>);
  }
  render() {
    const { visible } = this.state;
    return (<Dropdown
      trigger={['click']}
      visible={visible}
      overlay={this.renderMenu()}
      onVisibleChange={this.onVisibleChange}
    >
      {this.renderValue()}
    </Dropdown>);
  }
}


export default DropDownPicker;

