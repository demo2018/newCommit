
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
          <span className="state finished">已完成</span>
        </p>
      </div>
    );
  }
}

export default StepHead;
