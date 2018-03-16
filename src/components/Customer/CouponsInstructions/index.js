import { List, } from 'antd-mobile';
import styles from './index.less';

const Item = List.Item;

class CouponsInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '优惠券说明',
    };
    document.title = this.state.title;
  }
  render() {
    return (
      <div className={styles.couponsInstructions}>
        <List className="my-list">
          <Item wrap>优惠券使用规则
            <p>资讯类信息文案可以打满多行资讯类信息文案可以打满多行资讯类信息文案可以打满多行。</p>
          </Item>
          <Item wrap>有效期
            <p>资讯类信息文案可以打满多行资讯类信息文案可以打满多行资讯类信息文案可以打满多行。</p>
          </Item>
          <Item wrap> 其他说明
           <p>资讯类信息文案可以打满多行资讯类信息文案可以打满多行资讯类信息文案可以打满多行。</p>
          </Item>
        </List>
      </div>
    );
  }
}

export default CouponsInstructions;
