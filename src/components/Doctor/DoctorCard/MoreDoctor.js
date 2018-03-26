
class MoreDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  renderList() {
    const { toRecordListDet, list } = this.props;
    console.log(list);
    return (list || []).map(({ id, realName, hospitalName, adept = [] }) => {
      return (<li onClick={() => { toRecordListDet(id); }} key={id}>
        <div className="info">
          <img src={require('assets/head.png')} alt="" />
          <p className="aboutDoctor"><span className="doctorName">{realName}</span> <span className="doctorTitle">医学博士</span></p>
          <p className="doctorPlace">{hospitalName}</p>
           {/* <p className="doctorProject">{adept.join(',')}</p>  */}
          <span className="tag">推荐</span>
        </div>
      </li>);
    })
      ;
  }
  render() {
    return (
      <div className="more">
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default MoreDoctor;
