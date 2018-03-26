import { TextareaItem } from 'antd-mobile';
import styles from './index.less';
import PersonalInfo from './PersonalInfo';
import ProfessionalInfo from './ProfessionalInfo';

class DoctorInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '个人信息',
    };
    document.title = this.state.title;
  }
  handleChange(key) {
    return (value) => {
      const { changeInfo, details } = this.props;
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ details: { ...details, [key]: value } });
      if (key == 'intro') {
        changeInfo({ ...details, intro: value, });
      }
    };
  }
  render() {
    const { toDoctorName, details, changeInfo, partment, goodat, wechat } = this.props;
    const doctorProps = { toDoctorName, details, changeInfo, partment, goodat };
    const getWechat = { wechat };
    return (
      <div className={styles.doctorInfo}>
        {/* 个人资料 */}
        <PersonalInfo {...doctorProps} {...getWechat} />

        {/* 执业信息 */}
        <ProfessionalInfo {...doctorProps} />

        {/* 简介 */}
        <div className="moreInfo borderBottom borderTop">
          <p className="doctor-intro borderBottom">简介</p>
          <TextareaItem
            rows={5}
            count={200}
            defaultValue={details ? details.intro : null}
            placeholder="请输入内容"
            onChange={this.handleChange('intro')}
          />
           {/* <input type="textarea" defaultValue={details.intro} onChange={this.handleChange('intro')} /> */}
        </div>
      </div>
    );
  }
}

export default DoctorInfo;
