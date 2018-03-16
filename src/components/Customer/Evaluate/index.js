import { Tabs, Button, Checkbox, Toast, Tag, TextareaItem } from 'antd-mobile';
import styles from './index.less';
import PaidSuccess from './PaidSuccess';

const CheckboxItem = Checkbox.CheckboxItem;

const tabs = [
  { title: '表扬一下' },
  { title: '吐槽一下' }
];

function successToast() {
  Toast.success('评价成功', 1);
}

class Evaluate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '支付成功',
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
    const { evaluateInfo } = this.state;
    const { addEvaluate } = this.props;
    console.log(evaluateInfo);
    addEvaluate(evaluateInfo);
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
    return (
      <div className={styles.Evaluate}>
        <PaidSuccess />
        <div className="evaluate borderTop">
          <p className="evaluate-head">您此次就诊体验：</p>
          <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
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
