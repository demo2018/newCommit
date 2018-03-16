import { SearchBar } from 'antd-mobile';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <SearchBar placeholder="按姓名/手机号码/项目名称搜索" />
    );
  }
}

export default Search;
