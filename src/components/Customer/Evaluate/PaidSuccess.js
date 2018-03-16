

class PaidSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="paidSuccess borderBottom">
          <div className="payresultImg">
            <img src={require('images/success.png')} alt="支付成功" />
          </div>
          <div className="paidresult">
            支付成功：<span className="paid-monry">666.66</span>
          </div>
      </div>
    );
  }
}

export default PaidSuccess;
