import { Tabs, Button, Checkbox, Toast, Tag, TextareaItem } from 'antd-mobile';
import styles from './index.less';
import PaidSuccess from './PaidSuccess';

const CheckboxItem = Checkbox.CheckboxItem;


function successToast() {
  Toast.success('评价成功', 1);
}

class Evaluate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '支付成功',
      activeTab: 0,
      btnStatus: false,
      evaluateInfo: {
        content: '',
        tagIds: [],
        checkboxStatus: false,
      }
    };
    document.title = this.state.title;
  }
  onSubmit() {
    const { evaluateInfo, activeTab } = this.state;
    const { addEvaluate, wechat } = this.props;
    console.log(activeTab);
    //  获取微信配置
    wx.config({
      debug: true,
      appId: wechat.appId,
      timestamp: wechat.timestamp,
      nonceStr: wechat.nonceStr,
      signature: wechat.signature,
      jsApiList: ['onMenuShareTimeline']
    });
    if (evaluateInfo.checkboxStatus == true && activeTab == 0) {
      wx.onMenuShareTimeline({
        title: '', // 分享标题
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success: (res) => {
          //  用户确认分享后的执行函数
        }
      });
      // addEvaluate(evaluateInfo);
    }
  }

  handleCheckBoxChange(key) {
    return (value) => {
      if (value.target) {
        value = value.target.checked;
        this.setState({ [key]: value });
      }
    };
  }
  handleChange(key) {
    return (value) => {
      const { evaluateInfo } = this.state;
      if (value.target) {
        value = value.target.checked;
      }
      this.setState({ evaluateInfo: { ...evaluateInfo, [key]: value } });
    };
  }
  handleTagChange(key, value) {
    return (checked) => {
      const { evaluateInfo } = this.state;
      const { tagIds } = evaluateInfo;
      if (checked) {
        this.setState({ evaluateInfo: { ...evaluateInfo, [key]: [...tagIds, value] } });
      } else {
        const newTagIds = tagIds.filter((id) => {
          return id !== value;
        });
        this.setState({ evaluateInfo: { ...evaluateInfo, [key]: [...newTagIds] } });
      }
    };
  }
  renderTages(data = []) {
    const { evaluateInfo: { tagIds = [] } } = this.state;
    return data.map(({ id, name }, index) => {
      return (<Tag key={index} selected={tagIds.includes(id)} onChange={this.handleTagChange('tagIds', id)}>{name}</Tag>);
    });
  }
  render() {
    const { evaluateInfo } = this.state;
    const { goods, bads } = this.props;
    const tabsProps = {
      activeTab: this.state.activeTab,
      tabs: [
        { title: '表扬一下' },
        { title: '吐槽一下' }
      ],
      onTabClick: (tab, index) => {
        this.setState({ activeTab: index });
      },
    };
    return (
      <div className={styles.Evaluate}>
        <PaidSuccess />
        <div className="evaluate borderTop">
          <p className="evaluate-head">您此次就诊体验：</p>
          <Tabs {...tabsProps} initialPage={0} animated={false} useOnPan={false}>
            <div style={{ display: 'block', alignItems: 'center', justifyContent: 'center' }}>
              <div className="evaluate-tag">
                {this.renderTages(goods)}
              </div>
              <div className="write-evaluate borderBottom">
                <TextareaItem name="evaluate-word" rows="5" placeholder="给予表扬！" onChange={this.handleChange('content')} value={evaluateInfo.content} />
              </div>

              <div className="evaluate-submit">
                <Button type="primary" onClick={() => { this.onSubmit(); }}>确定</Button>
                <CheckboxItem
                  size="small"
                  checked={evaluateInfo.checkboxStatus}
                  onChange={this.handleChange('checkboxStatus')}
                >
                  分享给好友
                </CheckboxItem>
              </div>
            </div>
            <div style={{ display: 'block', alignItems: 'center', justifyContent: 'center' }}>
              <div className="evaluate-tag">
                {this.renderTages(bads)}
              </div>
              <div className="write-evaluate borderBottom">
                <TextareaItem name="evaluate-word" rows="5" placeholder="给予批评！" onChange={this.handleChange('content')} value={evaluateInfo.content} />
              </div>
              <div className="evaluate-submit">
                <Button type="primary" onClick={() => { this.onSubmit(); }}>确定</Button>
                <CheckboxItem
                  size="small"
                  checked={evaluateInfo.checkboxStatus}
                  onChange={this.handleChange('checkboxStatus')}
                >
                  发给薄荷改进
                </CheckboxItem>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Evaluate;
