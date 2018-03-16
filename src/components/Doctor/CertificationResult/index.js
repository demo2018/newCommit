import { Result } from 'antd-mobile';
import success from 'images/success.png';
import defeat from 'images/defeat.png';
import styles from './index.less';

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

class CertificationResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '医生认证',
    };
    document.title = this.state.title;
  }
  render() {
    return (
      <div className={styles.certificationResult}>
        {/* 成功 */}
        {/* <Result
          img={myImg(success)}
          title="提交成功"
          message={<div>您的信息已经提交成功 请耐心等待审核！（3）</div>}
        /> */}
        {/* 失败 */}
        <Result
          img={myImg(defeat)}
          title="提交失败"
          message={<div>网络中断，请重新提交</div>}
        />
      </div>
    );
  }
}

export default CertificationResult;
