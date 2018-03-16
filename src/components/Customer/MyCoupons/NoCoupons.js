
class NoCoupons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="noCoupons">
        <p><img src={require('images/nocoupons.png')} alt="暂无优惠券" /></p>
        <p className="noCop">暂无优惠券</p>
      </div>
    );
  }
}

export default NoCoupons;
