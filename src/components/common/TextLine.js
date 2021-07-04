import React from 'react';
import {View, StyleSheet} from 'react-native';

import {colors} from '../styles';
import {StyledText} from "./";


const TextLine = ({label, value, negative, positive}) => {
  let valueStyleApplied = [styles.valueStyle]

  if (negative)
    valueStyleApplied.push(styles.valueNegative)

  if (positive)
    valueStyleApplied.push(styles.valuePositive)

  return (
    <View style={styles.lineCont}>
      <View style={styles.flex}>
        <StyledText customStyles={styles.labelStyle}>{label.toUpperCase()}</StyledText>
      </View>
      <View style={styles.rightSide}>
        <StyledText customStyles={valueStyleApplied}>{value}</StyledText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  rightSide: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  lineCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 10
  },
  labelStyle: {
    color: colors.font,
    fontWeight: "700"
  },
  valueStyle: {
    color: colors.font,
    fontWeight: "400"
  },
  valueNegative: {
    color: colors.negative,
  },
  valuePositive: {
    color: colors.positive,
  }
});

export {TextLine};
