import styles from './index.less';
import { Button } from 'antd-mobile';


class AuthenticationFailed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '失败原因',
    };
    document.title = this.state.title;
  }
  render() {
    const { toCertification, toContactService, details } = this.props;
    return (
      <div className={styles.defeat}>
        <div className="defeatReason borderBottom borderTop">
          <div>
            <span>认证失败原因</span>
            <p>
              <span className="certificationDate">2017-12-03</span>
              <span className="certificationTime">10:30</span>
            </p>
          </div>
          <ul>
            <li>{details.failureReason}</li>
          </ul>
        </div>
        <Button type="primary" onClick={toCertification}>重新认证</Button>
        <div className="contactSrevice" onClick={toContactService}>
           联系客服
        </div>
      </div>
    );
  }
}

export default AuthenticationFailed;
