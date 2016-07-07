import * as ActionType from '../constants/ActionType';
import Immutable from 'immutable';

const initState = Immutable.Map({
})


export default function userReducer(state=initState, action) {
  const { type, userId, userInfo } = action;
  switch(type) {
    case ActionType.LOGIN_SUCCESS:
      return state.set('userId', userId);
    case ActionType.GET_USER_INFO_SUCCESS:
      return state.merge(userInfo)
    default:
      return state;
  }
}
