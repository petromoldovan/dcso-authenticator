import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import get from 'lodash/get'
import errorIcon from '../../assets/errorIcon.png'
import {Button, StyledText} from '../common/index'
//import {resetAction} from '../../actions/state'
import {colors} from '../styles/index'

const ErrorScreen = ({onPress, message, navigation}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.ContainerInner}>
        <View style={styles.flex}>
          <View style={styles.ErrorContainer}>
            <StyledText customStyles={styles.ErrorTextStyle}>{message ? message : get(navigation, 'state.params.message')}</StyledText>
          </View>
          <View style={styles.ImageContainer}>
            <Image style={styles.ImageStyles} source={errorIcon}/>
          </View>
          <View style={styles.SuccessContainer} />
        </View>
        <View style={styles.btnContainerStyle}>
          <Button onPress={onPress ? onPress : () => navigation.navigate('HomeScreen')}>
            <StyledText>OK</StyledText>
          </Button>
        </View>
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
    backgroundColor: colors.theme
  },
  ContainerInner: {
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
    marginVertical: 30,
    //fontFamily: 'Lato-Medium'
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
})

export default ErrorScreen
