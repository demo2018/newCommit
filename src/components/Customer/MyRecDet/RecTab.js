import { Tabs, Carousel } from 'antd-mobile';
import ToothPicker from './../../Common/ToothPicker/index';

const tabs = [
  { title: '全身情况' },
  { title: '牙位图' },
  { title: '影像资料' },
];
class RecTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderImage(val) {
    return (<a
      className="imageWrapper" key={val}
    >
      <img
        className="image"
        src={require('assets/my_img.jpg')}
        alt="影像资料"
      />
    </a>);
  }
  render() {
    const { dataSourse = [1, 2, 3] } = this.props;
    const carouselProps = {
      autoplay: false,
      infinite: true,
      selectedIndex: 1,
    };
    return (
      <div className="recTab borderBottom borderTop">
        <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false} swipeable={false}>
          <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <div className="general-condition">
              <ul>
                <li>疾病史：<span className="disease-history">无</span></li>
                <li>不良习惯：<span className="bad-habits">咬唇</span></li>
                <li>喂养：<span className="feed">母乳喂养</span></li>
                <li>药敏史：<span className="drug-history">无</span></li>
              </ul>
            </div>
          </div>
          <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <div className="teethImg">
              <div className="teethimage">
                <ToothPicker />
              </div>
              <ul>
                <li><span className="teeth-num">26</span>.<span className="teeth-info">智齿</span></li>
                <li><span className="teeth-num">38</span>.<span className="teeth-info">智齿</span></li>
                <li><span className="teeth-num">48</span>.<span className="teeth-info">龋坏</span></li>
              </ul>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Carousel
              {...carouselProps}
            >
              {dataSourse.map(this.renderImage)}
            </Carousel>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default RecTab;
