import { Tag } from 'antd-mobile';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  // 获取简介的高度，若高度超过三排，则展示箭头
  componentWillReceiveProps() {
    const tabDOM1 = this.content;
    if (tabDOM1.scrollHeight > 57) {
      this.setState({ description: 'wordClose' });
    }
  }
  // 点击切换简介状态
  clickOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  // 渲染擅长标签
  renderTags() {
    const { details, tags } = this.props;
    const partNames = (tags.content || [])
      .filter(({ id }) => {
        return details.adepts && details.adepts.includes(id) || details.adepts && details.adepts.includes(`${id}`);
      })
      .map(({ name }) => {
        return name;
      });
    return partNames.map((index) => {
      return (<Tag selected key={index}>{index}</Tag>);
    });
  }
  render() {
    let description = this.state.description;
    let icon = 'icon iconfont icon-xiangxiajiantou';
    if (this.state.open) {
      description += ' wordOpen';
      icon += ' icon-xiangshangjiantou';
    }
    const { details } = this.props;
    return (<div className="description part borderBottom borderTop">
      <p className="title">简介与擅长</p>
      <div className="content">
        <p className={description} ref={dom => { this.content = dom; }}>
          {details.hospitalName} | {details.intro}
        </p>
        {
          this.state.description == 'wordClose'
            ? <span className={icon} onClick={this.clickOpen}></span>
            : null
        }
      </div>
      <div className="tags">
        {this.renderTags()}
      </div>
    </div>);
  }
}

export default Description;
