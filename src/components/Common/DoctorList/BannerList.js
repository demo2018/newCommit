import { Carousel } from 'antd-mobile';
import { getServer } from 'utils/common';

class Doctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: document.documentElement.clientWidth,
    };
  }
  renderList() {
    const { banners } = this.props;
    const { medical } = getServer();
    return (banners.content || [])
      .filter(({ status }) => {
        return status == 1;
      })
      .map(({ id, image, link }, index) => {
        return (<a className="bannerWrapper" key={index} href={link}>
          <img
            className="bannerImg"
            src={`${medical}/bhyy/core/image/${image}`}
            alt="加载失败"
          />
        </a>);
      });
  }
  render() {
    return (
      <Carousel
        autoplay
        infinite
        autoplayInterval={3000}
        style={{ height: this.state.width * 0.56 }}
      >
        {this.renderList()}
      </Carousel>
    );
  }
}

export default Doctors;
