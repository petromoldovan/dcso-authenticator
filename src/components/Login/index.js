import {compose, withState} from 'recompose'
import {connect} from 'react-redux'
import {setPinCode} from '../../actions/state'
import Login from './Login'

function mapDispatchToProps(dispatch) {
  return {
    setPinCode: pin => dispatch(setPinCode(pin)),
  }
}

export const userStatus = {
  REGISTERED: "REGISTERED",
  UNREGISTERED: "UNREGISTERED"
}

const makeWithState = [
  withState('pin', 'setPin', ''),
  withState('pinConfirm', 'setPinConfirm', ''),
  withState('pinError', 'setPinError', false),
  withState('userStatus', 'setUserStatus', ''),
]

export default compose(
  connect(null, mapDispatchToProps),
  ...makeWithState
)(Login)
