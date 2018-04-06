import { TextareaItem } from 'antd-mobile';
import styles from './index.less';
import PersonalInfo from './PersonalInfo';
import ProfessionalInfo from './ProfessionalInfo';
import { createForm } from 'rc-form';

class DoctorInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '个人信息',
    };
    document.title = this.state.title;
    this.handleChange = this.handleChange.bind(this);
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
    const { toDoctorName, details, changeInfo, partment, goodat, wechat, imgUpload } = this.props;
    const doctorProps = { toDoctorName, details, changeInfo, partment, goodat, imgUpload };
    const getWechat = { wechat };
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.doctorInfo}>
        {/* 个人资料 */}
        <PersonalInfo {...doctorProps} {...getWechat} />

        {/* 执业信息 */}
        <ProfessionalInfo {...doctorProps} />

        {/* 简介 */}
        <div className="moreInfo borderBottom borderTop">
          <p className="doctor-intro borderBottom">简介</p>
          {
            details.intro != null
            ? <TextareaItem
              {...getFieldProps('intro', {
                initialValue: `${details.intro}`,
              }) }
              autoHeight
              rows={0}
              count={200}
              placeholder="请输入内容"
              onBlur={this.handleChange('intro')}
            />
              : <TextareaItem
                {...getFieldProps('intro') }
                rows={1}
                count={200}
                placeholder="请输入内容"
                onBlur={this.handleChange('intro')}
              />
            }
        </div>
      </div>
    );
  }
}

export default createForm()(DoctorInfo);
