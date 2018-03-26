import { Tabs, Button, Stepper, List, Checkbox, ActivityIndicator, Toast } from 'antd-mobile';
import styles from './index.less';

const CheckboxItem = Checkbox.CheckboxItem;


//  右侧父级
const formatTabs = (tabs = []) => {
  return tabs
    .filter(({ type }) => {
      return type === 0;
    })
    .map(({ className, id }) => {
      return {
        key: id,
        title: className,
      };
    });
};

//  子级项目
const formatProjects = (projects = []) => {
  return projects
    .map(({ name, id, price }) => {
      return {
        value: id,
        label: name,
        extra: price,
      };
    });
};

// 查找项目
const findProjectById = (key, list = []) => {
  return list.find(({ id }) => {
    return id === key;
  });
};

// 获取总价
const getTotalPrice = (selectedProjects = {}) => {
  return Object.keys(selectedProjects).reduce((TotalPrice, key) => {
    const { count, price } = selectedProjects[key] || {};
    return TotalPrice + count * price;
  }, 0);
};

class CheckProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '价格表',
      height: document.documentElement.clientHeight - 93,
    };
    document.title = this.state.title;
    this.handleNext = this.handleNext.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }
  onCheckboxChange(key) {
    return (value) => {
      const checked = value.target.checked;
      const { selectedProjects, projects, updateState } = this.props;
      const projectInfos = checked ? { ...findProjectById(key, projects), count: 1 } : undefined;
      updateState({ selectedProjects: { ...selectedProjects, [key]: projectInfos } });
    };
  }
  onStepperChange(key) {
    return (value) => {
      const { selectedProjects, projects, updateState } = this.props;
      const projectInfos = value ? { ...findProjectById(key, projects), count: value } : undefined;
      updateState({ selectedProjects: { ...selectedProjects, [key]: projectInfos } });
    };
  }
  handleNext() {
    const { selectedProjects = {}, toBill } = this.props;
    const selectedDates = Object.keys(selectedProjects).map((key) => {
      const { count, id, price, name } = selectedProjects[key] || {};
      return ({
        value: id,
        extra: price,
        countnum: count,
        proname: name,
      });
    });

    //  判断有问题，当未选择项目时应不跳转
    console.log(selectedDates);
    if (selectedDates) {
      localStorage.setItem('selectedProjects', JSON.stringify(selectedDates));
      toBill();
    } else {
      Toast.info('请选择至少一个项目', 1);
    }
  }
  handleTabChange({ key }) {
    const { getProjects } = this.props;
    getProjects(key);
  }
  renderTab() {
    const { projects = [], selectedProjects } = this.props;
    const newProjects = formatProjects(projects);
    return (
      <div style={{ backgroundColor: '#fff' }}>
        <List>
          {newProjects.map(({ value, label, extra }, index) => (
            <List.Item
              wrap
              key={index}
              extra={
                <Stepper
                  style={{ transform: 'scale(.8)' }}
                  showNumber
                  min={0}
                  value={(selectedProjects[value] || {}).count || 0}
                  onChange={this.onStepperChange(value)}
                />
              }
            >
              <CheckboxItem
                checked={!!(selectedProjects[value] || 0)}
                onChange={this.onCheckboxChange(value)}
              >
                {label}
                <List.Item.Brief>￥{extra}</List.Item.Brief>
              </CheckboxItem>
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
  render() {
    const { loading, tabs = [], selectedProjects } = this.props;
    const newTabs = formatTabs(tabs);
    const totalPrice = getTotalPrice(selectedProjects);

    return (
      <div className={styles.checkProject}>
        <ActivityIndicator animating={loading} toast />
        <div className="tab" style={{ height: this.state.height }}>
          <Tabs
            tabs={newTabs}
            tabBarPosition="left"
            tabDirection="vertical"
            onChange={this.handleTabChange}
          />
          <div className="tabContent">
            {this.renderTab()}
          </div>
        </div>
        <div className="total">
          <p>合计（人名币）：<span>￥{totalPrice}</span></p>
          <Button type="primary" onClick={this.handleNext}>下一步</Button>
        </div>
      </div>
    );
  }
}

export default CheckProject;
