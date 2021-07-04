import React from 'react'
import {
  StyleSheet,
  View,
  Platform,
  Linking,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import throttle from 'lodash/throttle'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import ErrorScreen from "../ErrorScreen"
//import {Pair} from '../../utils/VerificationUtils'
import LocalStorage from '../../utils/LocalStorage'
import {errors} from '../../constants'
import CryptoJS from 'crypto-js'
import {Header, StyledText} from '../common'
import {colors} from '../styles'
import ProgressBar from '../common/ProgressBar'
import { useIsFocused } from '@react-navigation/native';

const screen = Dimensions.get("screen");

const LoadingScreen = () => <div>loading...</div>

const Scanner = (props) => {
  const isFocused = useIsFocused();
  console.log('isFocused', isFocused)
  if (!isFocused) return <LoadingScreen />
  return <ScannerInner {...props} />
}

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

class ScannerInner extends React.PureComponent {
  _handleBarCodeRead = (e) => {
    const {navigation, setCodeCatched, isCodeCatched, pinCode, setTransactionData} = this.props
    if (!e || !e.data || isCodeCatched) {
      return null
    }

    setCodeCatched(true)

    console.log('1')
    console.log('e', e)
    try {
      let data = JSON.parse(e.data)

      console.log('GOT DATA!!!', data)

      //TODO
      if (data.key && data.pub) {
        const user = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        }

        //save to ls keys from registration
        const ls = new LocalStorage();
        let encryptedKeys = CryptoJS.AES.encrypt(e.data, pinCode)
        ls.save('isRegistered', encryptedKeys.toString())
        ls.save(`keys-${user.id}`, encryptedKeys.toString())
          .then(() => {
            //generate user otp
            try {
              // const pair = new Pair(e.data)
              // return navigation.dispatch({
              //   key: 'registration',
              //   type: 'ReplaceLastScreen',
              //   routeName: 'registration',
              //   params: {user, otp: pair.getOtp()}
              // })
              console.log('then')
            } catch(e) {
              console.log('catch0', e)
              return navigation.dispatch({
                key: 'errorScreen',
                type: 'ReplaceLastScreen',
                routeName: 'errorScreen',
                params: {message: errors.SCAN_ERROR}
              })
            }
          })
          .catch(err => {
            console.log('catch1', err)
            return navigation.dispatch({
              key: 'errorScreen',
              type: 'ReplaceLastScreen',
              routeName: 'errorScreen',
              params: {message: errors.SCAN_ERROR}
            })
          })
      } else {
        //show error
        return navigation.dispatch({
          key: 'errorScreen',
          type: 'ReplaceLastScreen',
          routeName: 'errorScreen',
          params: {message: errors.INVALID_QRCODE}
        })
      }
    } catch(e) {
      console.log('catch2', e)
      return navigation.dispatch({
        key: 'errorScreen',
        type: 'ReplaceLastScreen',
        routeName: 'errorScreen',
        params: {message: errors.INVALID_QRCODE}
      })
    }
  }

  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.cam) {
      const ratios = await this.cam.getSupportedRatiosAsync()
      const ratio = ratios[ratios.length - 1]
      this.props.setRatio(ratio)
    }
  }

  render() {
    const {navigation, ratio} = this.props

    const isFocused = this.props.navigation.isFocused();
    if (!isFocused) {
      return null;
    }

    return (
      <View style={styles.container}>
        <RNCamera
          ref={cam => this.cam = cam}
          type={RNCamera.Constants.Type.back}
          ratio={ratio}
          onBarCodeRead={throttle(this._handleBarCodeRead, 5000)}
          style={styles.preview}
          flashMode={RNCamera.Constants.FlashMode.off}
          onCameraReady={this.prepareRatio}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          notAuthorizedView={<ErrorScreen onPress={Linking && Linking.openURL ? () => Linking.openURL('app-settings:') : null} message={'Please allow usage of the camera in the phone settings'} navigation={navigation} />}
          >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ height: screen.height }}>
                <Header
                  title={"Scan QR Code"}
                  hasBackButton={true}
                  navigation={navigation}
                  small />
                <View style={styles.rectangleContainer} >
                  <View style={styles.rectangle} />
                </View>
                <StyledText customStyles={styles.scanningLabel}>Scanning</StyledText>
                <ProgressBar navigation={navigation} />
              </View>
            );
          }}

        </RNCamera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  flex: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  scanningLabel: {
    color: colors.white,
    padding: 10,
    margin: 40,
    marginBottom: 10
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: colors.theme,
  },
});

export default Scanner
