import { Tag } from 'antd-mobile';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  // 点击切换简介状态
  clickOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  // 渲染擅长标签
  renderTags() {
    const { details } = this.props;
    console.log(details);
    return (details.adepts || []).map((index) => {
      return (<Tag selected key={index}>{index}</Tag>);
    });
  }
  render() {
    let description = 'wordClose';
    let icon = 'icon iconfont icon-xiangxiajiantou';
    if (this.state.open) {
      description += ' wordOpen';
      icon += ' icon-xiangshangjiantou';
    }
    const { details } = this.props;
    return (<div className="description part borderBottom borderTop">
      <p className="title">简介与擅长</p>
      <div className="content">
        <p className={description}>
          {details.hospitalName} | {details.intro}
        </p>
        {/* {description && description.offsetHeight > 55 ? <span className={icon} onClick={this.clickOpen}></span> : null} */}
        <span className={icon} onClick={this.clickOpen}></span>
      </div>
      <div className="tags">
        {this.renderTags()}
      </div>
    </div>);
  }
}

export default Description;
