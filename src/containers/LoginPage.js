import { connect, bindActionCreators } from 'react-redux';
import { Component, PropTypes } from 'react';
import { PATH_PREFIX } from '../utils/GlobalUtil';

import { doLogin } from '../actions/userAction';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { userInfo } = nextProps;
    if(userInfo.userId) {
      router.replaceState(null, `${PATH_PREFIX}user`, {userId: userInfo.get('userId')})
    }
  }

	getChildContext() {
		return { location: this.props.location }
	}

  getFormValue() {
    const { username, password } = this.refs;
    let formObj = {};
    if(username) {
      formObj.username = username.value;
    }
    if(password) {
      // @TODO 需要md5加密
      formObj.password = password.value;
    }
    return formObj;
  }
  onClick() {
    const formObj = this.getFormValue();
    const { doLogin } = this.props;
    doLogin(formObj);
	  const { router } = this.context;
    router.pushState(null, `${PATH_PREFIX}user`, {a: 1})
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div>
        <input type="text" ref="username" placeholder="用户名" defaultValue={userInfo.get('userName')}/>
        <input type="password" ref="password" placeholder="密码" defaultValue={userInfo.get('password')}/>
        <button onClick={this.onClick}>登录</button>
      </div>
    )
  }
}

LoginPage.childContextTypes = {
    location: PropTypes.object.isRequired
}

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { userInfo } = state;
  return {
    userInfo
  }
}

function mapDispatchToProps() {
  return {
    doLogin
  }
}
export default connect(mapStateToProps, {
  doLogin
})(LoginPage);
