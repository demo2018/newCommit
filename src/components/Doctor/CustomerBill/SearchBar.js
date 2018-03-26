import { SearchBar } from 'antd-mobile';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <SearchBar placeholder="按姓名/项目名称、账单号搜索" onSubmit={this.handleChange()} />
    );
  }
}

export default Search;
