
class MoreDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="more">
        <ul>
          <li>
            <div className="info">
              <img src={require('assets/head.png')} alt="" />
              <p className="aboutDoctor"><span className="doctorName">陈帆</span> <span className="doctorTitle">医学博士</span></p>
              <p className="doctorPlace">北大口腔</p>
              <p className="doctorProject">种植外科、牙槽外科</p>
              <span className="tag">推荐</span>
            </div>
          </li>
          <li>
            <div className="info">
              <img src={require('assets/head.png')} alt="" />
              <p className="aboutDoctor"><span className="doctorName">陈帆</span> <span className="doctorTitle">医学博士</span></p>
              <p className="doctorPlace">北大口腔</p>
              <p className="doctorProject">种植外科、牙槽外科</p>
              <span className="tag">推荐</span>
            </div>
          </li>
          <li>
            <div className="info">
              <img src={require('assets/head.png')} alt="" />
              <p className="aboutDoctor"><span className="doctorName">陈帆</span> <span className="doctorTitle">医学博士</span></p>
              <p className="doctorPlace">北大口腔</p>
              <p className="doctorProject">种植外科、牙槽外科</p>
              <span className="tag">推荐</span>
            </div>
          </li>
          <li>
            <div className="info">
              <img src={require('assets/head.png')} alt="" />
              <p className="aboutDoctor"><span className="doctorName">陈帆</span> <span className="doctorTitle">医学博士</span></p>
              <p className="doctorPlace">北大口腔</p>
              <p className="doctorProject">种植外科、牙槽外科</p>
              <span className="tag">推荐</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default MoreDoctor;
