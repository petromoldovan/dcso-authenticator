import React from 'react'
import {compose, lifecycle} from 'recompose'
import {BackHandler, Platform} from 'react-native'
import ErrorScreen from './ErrorScreen'

let listener = null

const makeWithLifecycle = lifecycle({
  componentDidMount() {
    //handle Android back button press
    if (Platform.OS === "android" && listener === null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        return this.props.navigation.dispatch({
          key: 'index',
          type: 'ReplaceLastScreen',
          routeName: 'index'
        })
      })
    }
  }
})

export default compose(
  makeWithLifecycle
)(ErrorScreen)
