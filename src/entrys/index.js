

import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';
import { hashHistory, browserHistory,  Router, Route, IndexRoute ,Redirect } from 'react-router';

import App from '../containers/App';
import LoginPage from '../containers/LoginPage';
import UserPage from '../containers/UserPage'

import { PATH_PREFIX } from '../utils/GlobalUtil';

import Immutable from 'immutable';

// 将state中第二级Immutable Data转换成js对象
function stateTransformer(state) {
  console.log('stateTransformer');
  let newState = {};
  for (var i of Object.keys(state)) {
    if (Immutable.Iterable.isIterable(state[i])) {
      newState[i] = state[i].toJS();
    } else {
      newState[i] = state[i];
    }
  };
  return newState;
}

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger({stateTransformer}) ]

const initialState = Immutable.Map();
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const store = createStoreWithMiddleware(reducer, initialState)

// 生产环境使用browser history
// 测试环境使用hash history
// 第一次上测试、预发布和生产环境时，要和运维确认增加nginx配置
const history = (process.env.NODE_ENV === 'production') ? browserHistory : hashHistory;



render(
	<Provider store={store}>
		<Router history={history}>
      <Route path={`${PATH_PREFIX}`} component={App}>
        <IndexRoute component={LoginPage}/>
        <Route path="user" component={UserPage}/>
      </Route>
    </Router>
	</Provider>,
	document.getElementById('container')
)
