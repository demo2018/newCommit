
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { children } = this.props;
    return (
      <div className="page">
        {children}
      </div >
    );
  }
}

export default Layout;
