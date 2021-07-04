import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {StyledText} from "./"

import {colors} from '../styles';


const Button = ({disabled, children, onPress, uppercase, theme}) => {
  let containerStyle = [styles.buttonStyle];
  let textStyle = [styles.textStyle];
  let childrenRendered = children;

  if (theme) {
    containerStyle.push(styles.themeCont);
    textStyle.push(styles.themeText);
  }

  if (uppercase) childrenRendered = childrenRendered.toUpperCase();

  if (disabled) containerStyle.push(styles.disabledStyle);

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} disabled={disabled}>
      <StyledText customStyles={textStyle}>{childrenRendered}</StyledText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: colors.black,
    fontSize: 15,
    fontWeight: "700",
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.g1,
    borderWidth: 1,
    borderColor: colors.g2,
    padding: 20,
    opacity: 1,
  },
  disabledStyle: {
    opacity: 0.1
  },
  themeCont: {
    backgroundColor: colors.theme,
    borderColor: colors.theme,
    borderWidth: 1,
  },
  themeText: {
    color: colors.white,
    fontWeight: "700",
    letterSpacing: 1
  }
});

export {Button};
