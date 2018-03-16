import { Carousel } from 'antd-mobile';

class Doctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: document.documentElement.clientWidth,
    };
  }
  renderList() {
    const { banners } = this.props;
    return (banners.content || [])
      .filter(({ status }) => {
        return status == 1;
      })
      .map(({ id, image }, index) => {
        return (<a className="bannerWrapper" key={index}>
          <img
            className="bannerImg"
            src={require('assets/banner.png')}
            alt="加载失败"
          />
        </a>);
      });
  }
  render() {
    const carouselProps = {
      autoplay: true,
      infinite: true,
      selectedIndex: 1,
    };
    return (
      <Carousel
        style={{ height: this.state.width * 0.56 }}
        {...carouselProps}
      >
        {this.renderList()}
      </Carousel>
    );
  }
}

export default Doctors;
