import { SearchBar } from 'antd-mobile';

class Doctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleChange(key) {
    const { search } = this.props;
    return (value) => {
      if (value) {
        this.props.fetchSearchList({ ...search, [key]: value });
      }
    };
  }
  render() {
    return (
      <SearchBar placeholder="请输入医生姓名" onSubmit={this.handleChange('name')} />
    );
  }
}

export default Doctors;
