import { Tag } from 'antd-mobile';
import { formatDate } from 'utils/common';

class Evaluation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ details: nextProps.details });
    }
  }

  //  渲染评价标签内容
  renderTags() {
    const { details } = this.state;
    const { goods, bads } = this.props;
    const tags = details && details.comment && details.comment.tagIds;
    const allTag = [...goods, ...bads];
    const partNames = allTag
      .filter(({ id }) => {
        return tags.includes(id) || tags.includes(`${id}`);
      })
      .map(({ name }) => {
        return name;
      });
    return partNames.map((index) => {
      return (<Tag selected key={index}>{partNames}</Tag>);
    });
  }
  render() {
    const { details } = this.state;
    return (
      <div className="evaluation borderBottom borderTop">
        <div className="evaluation-head">
          <span className="evaluation-left">患者评价</span>
          <span className="evaluation-date">
            {formatDate(details.comment.createTime)}
          </span>
        </div>
        <div className="evaluation-tag">
           {this.renderTags()}
        </div>
        <div className="evaluation-word">
          {details && details.comment ? details.comment.content : null}
        </div>
      </div>
    );
  }
}


export default Evaluation;
