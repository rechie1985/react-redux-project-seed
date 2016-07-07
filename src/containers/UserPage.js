import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as PageType from '../constants/PageType';

import { getUserInfo } from '../actions/userAction';

import List from '../components/List/List';



class UserPage extends Component {
  constructor(props) {
    super(props);
    this._renderWork = this._renderWork.bind(this);
  }

  componentWillMount() {
    const { userPageInfo, getUserInfo } = this.props;
    // 初始化状态，请求相关内容
    if(userPageInfo.get('pageStatus') === PageType.PAGE_INIT) {
      getUserInfo();
    }
  }

  _renderWork(rowData, index) {
    const name = rowData.get('name');
    return (
      <li key={name}>
        <span>{name}</span>
      </li>
    )
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div>
        <h2>
          <img src={userInfo.get('userAvatar')}/>
          {userInfo.get('userName')}
        </h2>
        <h3>
          技术框架/库
        </h3>
        <List
          data={userInfo.get('works')}
          renderRow={this._renderWork}
          />
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { userPageInfo , userInfo } = state;
  return {
    userPageInfo,
    userInfo
  };
}

function mapDispatchToProps() {
  return {
    getUserInfo
  };
}

export default connect(mapStateToProps, mapDispatchToProps())(UserPage);
