import { Result } from 'antd-mobile';
import success from 'images/success.png';
import styles from './index.less';

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

class CertificationResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '提交反馈',
    };
    document.title = this.state.title;
  }
  render() {
    return (
      <div className={styles.feedbackResult}>
        <Result
          img={myImg(success)}
          title="提交成功"
          message={<div>感谢您对薄荷牙医的关注和支持！</div>}
        />
      </div>
    );
  }
}

export default CertificationResult;
