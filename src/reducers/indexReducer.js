import Immutable from 'immutable';
import * as ActionType from '../constants/ActionType';
import * as PageType from '../constants/PageType';

const initState = Immutable.Map({
  pageStatus: PageType.PAGE_INIT
});

export default function indexPageReducer(state=initState, action) {
  const { type } = action.type;
  switch(type) {
    case ActionType.GET_ITEM_LIST_REQUEST:
      return state.set('pageStatus', state.get('pageStatus') === PageType.PAGE_INIT ? PageType.PAGE_INIT : PageType.LOADING);
    default:
      return state;
  }
}
