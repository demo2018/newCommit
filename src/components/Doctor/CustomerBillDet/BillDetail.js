
import { login } from './../../../services/layout';
class BillDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderProjects() {
    const { details } = this.props;
    console.log(details);
    return (details.items || []).map(({ itemName, discount, num, actualCost, originalPrice }, index) => {
      return (
          <tr key={index}>
            <td>
              <span className="patient-project">{itemName}</span>
              <p className="patient-pro-discount">折扣：
              <span className="pro-discount-det">{discount}</span>
              </p>
            </td>
            <td className="patient-pronum">{num}</td>
            <td>
              <span className="patient-proprice">{actualCost}</span>
              <p className="original-price">
                {originalPrice}
              </p>
            </td>
          </tr>
        );
    });
  }
  render() {
    const { details } = this.props;
    return (
      <div className="billDetContent">
        <div className="bill-det borderBottom">
          <p className="bill-dethead">账单明细</p>
          <div className="tableWrapper borderBottom borderTop">
            <table cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  <th>项目</th>
                  <th>数量</th>
                  <th>价格</th>
                </tr>
              </thead>
              <tbody>
                {this.renderProjects()}
              </tbody>
              <tfoot>
                <tr className="combined">
                  <td>
                    <span className="combined-price">合计</span>
                    <p>折扣：
                      <span className="combined-discount">{details.discount}</span>
                    </p>
                  </td>
                  <td></td>
                  <td>
                    <span className="combined-discount-price">{details.actualCost}</span>
                    <p className="original-price">{details.originalCost}</p>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

    );
  }
}

export default BillDetail;
