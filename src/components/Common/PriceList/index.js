import Search from './Search';
import styles from './index.less';
import Tab from './Tabs';

class PriceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '价格表',
    };
    document.title = this.state.title;
  }
  render() {
    const { toPriceDetail, toContactService } = this.props;
    const PriceDetailProps = {
      toPriceDetail
    };
    return (
      <div className={styles.priceList}>
        <Search />
        <Tab {...PriceDetailProps} />
        <div className="consulting" onClick={toContactService}>
          <img src={require('images/consulting.png')} alt="咨询" />
        </div>
      </div >
    );
  }
}

export default PriceList;
