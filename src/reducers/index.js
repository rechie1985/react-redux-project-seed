import { combineReducers } from 'redux';
import index from './indexReducer';
import userInfo from './userInfoReducer';
import userPageInfo from './userPageReducer';
const rootReducer = combineReducers({
  index,
  userInfo,
  userPageInfo
});


export default rootReducer;
