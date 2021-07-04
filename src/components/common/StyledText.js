import React from 'react'
import {Text, StyleSheet} from 'react-native'

const StyledText = (props) => {
  const {children, customStyles} = props
  const textStyles = [styles.baseStyle]
  if (customStyles) {
    textStyles.push(customStyles)
  }

  return (
    <Text style={textStyles}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  baseStyle: {
    //fontFamily: 'Lato-Light'
  }
})

export {StyledText}
