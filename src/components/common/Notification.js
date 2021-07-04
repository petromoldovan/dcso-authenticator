import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import successIcon from '../../assets/successIcon.png';
import errorIcon from '../../assets/errorIcon.png';
import {Button, StyledText} from './';
import {colors} from '../styles';


const Notification = ({errorMsg, onPress}) =>{
  return (
    <View style={styles.Container}>
      <View style={styles.flex}>
        <View style={styles.ErrorContainer}>
          {errorMsg && <StyledText customStyles={styles.ErrorTextStyle}>{errorMsg}</StyledText>}
        </View>
        <View style={styles.ImageContainer}>
          <Image style={styles.ImageStyles} source={errorMsg ? errorIcon : successIcon}/>
        </View>
        <View style={styles.SuccessContainer}>
          {!errorMsg && <StyledText customStyles={styles.SuccessTextStyle}>Success</StyledText>}
        </View>
      </View>
      <View style={styles.btnContainerStyle}>
        <Button onPress={onPress}>
          <StyledText>OK</StyledText>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  Container: {
    flex: 1,
    padding: 10
  },
  ErrorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  ImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyles: {
    width: 150,
    height: 150,
  },
  ErrorTextStyle: {
    fontSize: 27,
    color: colors.white,
    textAlign: 'center',
    marginVertical: 30
  },
  SuccessContainer: {
    flex: 1,
  },
  SuccessTextStyle: {
    fontSize: 33,
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: 20
  },
  btnContainerStyle: {
    justifyContent: 'flex-end',
  }
});

export {Notification};
