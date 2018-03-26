import styles from './index.less';

class PriceListDet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '价格表',
    };
    document.title = this.state.title;
  }
  render() {
    const { details, toContactService } = this.props;
    return (
      <div className={styles.priceListDet}>
        {/* banner图 */}
        <div className="banner-zone">
          <img src={require('assets/banner.png')} alt="banner" />
        </div>
        <div className="price-content">
          <div className="intro">
            <h5>{details.name}</h5>
            <p>{details.intro}</p>
          </div>
          {/* <div className="tips">
            <span>温馨提示：</span>
            <p>1. 治疗期间轻微疼痛肿胀，可不处理，两三天后症状自行消失。疼痛明显，通过复诊换药，调和，可达到缓解症状的目的。 </p>
            <p>2. 治疗期间暂时不用换侧咀嚼，导致临时材料部分脱落。</p>
          </div> */}
        </div>
        <div className="relate-link">
          {
            details.linkTitle
              ? <p>相关链接：<a href={details.link}>{details.linkTitle}</a></p>
            : null
          }
        </div>
        <div className="consulting" onClick={toContactService}>
          <img src={require('images/consulting.png')} alt="咨询" />
        </div>
      </div>
    );
  }
}

export default PriceListDet;
