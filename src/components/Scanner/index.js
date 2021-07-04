import React from 'react'
import {
  BackHandler,
  Platform,
} from 'react-native'
import {connect} from 'react-redux'
import {compose, withState, lifecycle} from 'recompose'
import {setTransactionData} from '../../actions/state'
import Scanner from './Scanner'

function mapStateToProps(state) {
  const pinCode = state.getIn(['coreReducer', 'pinCode'], null)

  return {
    pinCode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTransactionData: data => dispatch( setTransactionData(data))
  }
}

// Subscribe to Android back btn listener only once
let listener = null;

const makeWithLifecycle = lifecycle({
  componentDidMount() {
    //handle Android back button press
    if (Platform.OS === "android" && listener === null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        this.props.navigation.navigate('IndexScreen')
      })
    }
  }
})

const makeWithState = [
  withState('isCodeCatched', 'setCodeCatched', false),
  withState('ratio', 'setRatio', undefined)
]

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ...makeWithState,
  makeWithLifecycle,
)(Scanner)
