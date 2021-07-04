import {actionTypes} from '../constants';
//import { NavigationActions } from 'react-navigation'

// export const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'index'})
//   ]
// })

export function setTransactionData(data) {
  return {
    type: actionTypes.SET_TRANSACTION_DATA,
    payload: data
  }
}

export function setPinCode(pin) {
  return {
    type: actionTypes.SET_PIN_CODE,
    payload: pin
  }
}

export function addUserAccount(user) {
  return {
    type: actionTypes.ADD_USER_ACCOUNT,
    payload: user
  }
}

export function setUserAccounts(arr) {
  return {
    type: actionTypes.SET_USER_ACCOUNTS,
    payload: arr
  }
}

