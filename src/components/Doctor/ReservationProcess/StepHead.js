
class StepHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="stepHead borderBottom">
        <img src={require('assets/head.png')} alt="" />
        <p>
          <span className="customerName">刘媛媛</span>
          <span className="state">已预约</span>
        </p>
      </div>
    );
  }
}

export default StepHead;
