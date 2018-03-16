import { SearchBar } from 'antd-mobile';

class Doctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleChange(key) {
    return (value) => {
      if (value) {
        this.props.fetchSearchList({ [key]: value });
      }
    };
  }
  render() {
    return (
      <SearchBar placeholder="请输入医生姓名" onSubmit={this.handleChange('doctorName')} />
    );
  }
}

export default Doctors;
