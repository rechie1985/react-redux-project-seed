import * as ActionType from '../constants/ActionType';
import * as PageType from '../constants/PageType';
import Immutable from 'immutable';

const initState = Immutable.Map({
  errorMessage: '',
  pageStatus: PageType.PAGE_INIT
});

export default function userPageReducer(state=initState, action) {
  const { type } = action;
  switch(type) {
    default:
      return state;
  }
}
