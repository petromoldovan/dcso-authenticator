import React from 'react'
import * as Progress from 'react-native-progress'
import {StyleSheet, Dimensions} from 'react-native'
import {compose, withState, lifecycle} from 'recompose'
import {colors} from "../styles/index"
import {errors} from "../../constants"

const makeWithState = [
  withState('progress', 'setProgress', 0.0001),
]

const makeWithLifecycle = lifecycle({
  componentDidMount() {
    let startProgress = setInterval(() => {
      if (this.props.progress > 1.01) {
        const {navigation} = this.props
        navigation.navigate('ErrorScreen', {message: errors.SCAN_ERROR})
        clearInterval(startProgress)
      }
      const newValue = parseFloat(this.props.progress) + 0.01
      this.props.setProgress(newValue)
    }, 250)
  }
})

const ProgressBar = ({progress}) =>  (
  <Progress.Bar
    animater={true}
    borderWidth={2}
    progress={progress}
    unfilledColor={colors.transparent}
    width={Dimensions.get('window').width - 30}
    style={styles.bar} />
)


const styles = StyleSheet.create({
  bar: {
    marginBottom: 30
  }
})

export const ProgressBarPure = ProgressBar
export default compose(
  ...makeWithState,
  makeWithLifecycle
)(ProgressBar)
