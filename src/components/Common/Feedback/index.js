import { Button, List, TextareaItem, Toast } from 'antd-mobile';
import styles from './index.less';


class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '意见反馈',
    };
    document.title = this.state.title;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 提交反馈
  handleSubmit() {
    const { feedbackSubmit } = this.props;
    const { content } = this.state;
    if (content) {
      feedbackSubmit(content);
    } else {
      Toast.info('请输入反馈内容', 1);
    }
  }
  handleChange(key) {
    return (value) => {
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ [key]: value });
    };
  }
  render() {
    return (
      <div className={styles.feedback}>
        <div className="write-feedback">
          <List>
            <TextareaItem
              rows={5}
              count={500}
              onChange={this.handleChange('content')}
              placeholder="请留下您的宝贵意见"
            />
          </List>
        </div>
        <Button type="primary" onClick={this.handleSubmit}>提交反馈</Button>
      </div>
    );
  }
}

export default Feedback;
