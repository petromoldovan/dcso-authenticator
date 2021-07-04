import { fromJS } from 'immutable';

import {actionTypes} from '../../constants';


function addUserAccount(state, newAccount) {
  let users = state.getIn(['userAccounts'], []);
  users.push(newAccount);

  return state.setIn(['userAccounts'], users);
}

export default function coreReducer (_state, action) {
  const state = _state || fromJS({});

  switch (action.type) {
    case actionTypes.SET_TRANSACTION_DATA:
      return state.setIn(['transaction'], action.payload);
      break;
    case actionTypes.SET_PIN_CODE:
      return state.setIn(['pinCode'], action.payload);
      break;
    case actionTypes.ADD_USER_ACCOUNT:
      return addUserAccount(state, action.payload);
      break;
    case actionTypes.SET_USER_ACCOUNTS:
      return state.setIn(['userAccounts'], action.payload);
      break;
    default:
      return state
  }
}
