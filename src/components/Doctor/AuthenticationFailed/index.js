import styles from './index.less';
import { Button } from 'antd-mobile';
import { formatDate } from 'utils/common';


class AuthenticationFailed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '失败原因',
    };
    document.title = this.state.title;
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    const { toContactService } = this.props;
    toContactService();
  }
  render() {
    const { toCertification, details } = this.props;
    return (
      <div className={styles.defeat}>
        <div className="defeatReason borderBottom borderTop">
          <div>
            <span>认证失败原因</span>
            <p>
              <span className="certificationDate">{formatDate(details.failureTime)}</span>
            </p>
          </div>
          <ul>
            <li>{details.failureReason}</li>
          </ul>
        </div>
        <Button type="primary" onClick={toCertification}>重新认证</Button>
        <div className="contactSrevice" onClick={this.onClick}>
           联系客服
        </div>
      </div>
    );
  }
}

export default AuthenticationFailed;
