import { SearchBar } from 'antd-mobile';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onCancel() {
    return (value) => {
      if (value) {
        this.props.fetchSearchList('');
      }
    };
  }
  handleChange() {
    return (value) => {
      if (value) {
        this.props.fetchSearchList(value);
      }
    };
  }
  render() {
    return (
      <SearchBar placeholder="按姓名/手机号码/项目名称搜索" onSubmit={this.handleChange()} onCancel={this.onCancel()} />
    );
  }
}

export default Search;
