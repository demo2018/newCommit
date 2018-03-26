import { Toast } from 'antd-mobile';

class ContactService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (localStorage.getItem('times') == 1) {
      window.location.href = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=47693';
      window.history.back(-1);
    } else {
      Toast.loading('正在为您匹配牙医助理...', 30);
      setTimeout(() => {
        Toast.hide();
        localStorage.setItem('times', 1);
        window.location.href = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=47693';
        window.history.back(-1);
      }, 1000);
    }
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}

export default ContactService;
