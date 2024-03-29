
class BillDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderList() {
    const { details } = this.props;
    return (details.items || []).map(({ itemName, discount, num, actualCost, originalPrice }, index) => {
      return (
        <tr key={index}>
          <td>
            <span className="patient-project">{itemName}</span>
            {
              discount != 1
                ? <p className="patient-pro-discount">折扣：
                  <span className="pro-discount-det">{(discount * 10) + '折'}</span>
                </p>
                : null
            }
          </td>
          <td className="patient-pronum">{num}</td>
          <td>
            <span className="patient-proprice">{actualCost}</span>
            {
              discount != 1
              ? <p className="original-price">
                {originalPrice}
              </p>
              : null
            }
          </td>
        </tr>
      );
    });
  }
  render() {
    const { details } = this.props;
    return (
      <div className="myBillDetContent">
        <div className="bill-det">
          <p className="bill-dethead">账单明细</p>
          <div className="tableWrapper borderTop">
            <table cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  <th>项目</th>
                  <th>数量</th>
                  <th>价格</th>
                </tr>
              </thead>
              <tbody>
                {this.renderList()}
              </tbody>
              <tfoot className="borderTop tablefoot">
                <tr className="combined" >
                  <td>
                    <span className="combined-price">合计</span>
                    {
                      details.discount != 1
                        ? <p>折扣：
                          <span className="combined-discount pro-discount-det">{(details.discount * 10) + '折'}</span>
                        </p>
                      : null
                    }
                  </td>
                  <td></td>
                  <td>
                    <span className="combined-discount-price">{details.actualCost}</span>
                     {
                      details.discount != 1
                      ? <p className="original-price">{details.originalCost}</p>
                      : null
                    }
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
