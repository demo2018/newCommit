import { PullToRefresh } from 'antd-mobile';
import classnames from 'classnames';
import BannerList from './BannerList';
import DoctorList from './DoctorList';
import SearchBar from './SearchBar';
import DoctorSelect from './DoctorSelect';
import styles from './index.less';

class Doctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '医生团队',
      refreshing: false,
      searchVisible: false, // 搜索框显状态
      down: false,
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
    };
    document.title = this.state.title;
    this.toFixed = this.toFixed.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ doctorList: nextProps.details });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop >= this.state.width * 0.56 - 44) {
      this.setState({ searchVisible: true });
    } else {
      this.setState({ searchVisible: false });
    }
  }
  toFixed() {
    window.scrollTo(0, this.state.width * 0.56 - 44);
    event.stopPropagation();
  }
  render() {
    const { height, refreshing, searchVisible } = this.state;
    const { toDoctorDetail, details, banners, servicesItem, fetchSearchList, search, toContactService } = this.props;
    const doctorListProps = { details };
    const bannerProps = { banners };
    const pullToRefreshProps = {
      direction: 'up',
      refreshing,
      style: {
        height,
        overflow: 'auto',
      },
      indicator: {
        deactivate: '下拉可以刷新'
      },
      ref: (el) => { this.ptr = el; },
      onRefresh: () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
          this.setState({ refreshing: false });
        }, 1000);
      },
    };

    const searchBarProps = {
      search,
      fetchSearchList,
      servicesItem,
      details,
    };

    return (<div
      className={styles.doctorsPage}
    >
      {/* <PullToRefresh {...pullToRefreshProps}> */}
      <BannerList {...bannerProps} />
      <div className={classnames({ fixSearchBar: searchVisible })}>
        {searchVisible && <SearchBar {...searchBarProps} />}
        <div>
          <DoctorSelect {...searchBarProps} />
        </div>
      </div>
      <DoctorList toDoctorDetail={toDoctorDetail} {...doctorListProps} />
      {/* </PullToRefresh> */}
      <div className="consulting" onClick={() => { toContactService(); }}>
        <img src={require('images/consulting.png')} alt="咨询" />
      </div>
    </div>);
  }
}

export default Doctors;
