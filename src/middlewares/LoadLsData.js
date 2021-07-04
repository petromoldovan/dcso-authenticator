import { setUserAccounts } from '../actions/state';
import { actionTypes } from '../constants';
import LocalStorage from '../utils/LocalStorage';

const middleware = store => next => action => {
  const actionResult = next(action);

  switch (action.type) {
    case actionTypes.SET_PIN_CODE:
      const ls = new LocalStorage();
      ls.load('accounts')
        .then(data => {
          //console.log("loading accounts", JSON.parse(data))
          store.dispatch( setUserAccounts(JSON.parse(data)) );
        })
        .catch(e => {
          //console.log("could not load accounts", e)
        })
      break;
    default: // noop
  }

  return actionResult;
};

export default middleware;