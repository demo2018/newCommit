import { SearchBar } from 'antd-mobile';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <SearchBar placeholder="按姓名/项目名称、账单号搜索" />
    );
  }
}

export default Search;
