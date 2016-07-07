import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>智慧树react项目标题</h2>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {

}
export default connect(mapStateToProps, {})(App);
