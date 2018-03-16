import { SearchBar } from 'antd-mobile';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <SearchBar placeholder="按项目名称搜索" />
    );
  }
}

export default Search;
