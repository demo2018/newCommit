import { Popover, Modal } from 'antd-mobile';

const Item = Popover.Item;

class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popVisible: false
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(node, key) {
    const { toCancel, times } = this.props;
    const today = new Date().getTime();
    const appointDate = new Date(times).getTime();
    this.setState({ popVisible: false });
    if (key == 0) {
      // 判断取消时间在24小时内弹出弹窗
      if (appointDate - today <= 86400000) {
        Modal.alert('取消预约', <div>
          <p>就诊前24小时内的预约</p>
          <p>请联系您的医生助理进行取消</p>
        </div>, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确定', onPress: () => console.log('OK') },
        ]);
      } else {
        toCancel();
      }
    }
  }
  handleVisibleChange = (popVisible) => {
    this.setState({
      popVisible,
    });
  };
  render() {
    const { popVisible } = this.state;
    return (
      <Popover
        mask
        visible={popVisible}
        align={{
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [-1, 7],
        }}
        overlay={[
          (<Item key="1" value="scan" >取消预约</Item>),
          (<Item key="2" value="scan" >关闭</Item>),
        ]}
        onVisibleChange={this.handleVisibleChange}
        onSelect={this.handleSelect}
      >
        <img src={require('images/more.png')} alt="more" />
      </Popover>);
  }
}

export default More;
