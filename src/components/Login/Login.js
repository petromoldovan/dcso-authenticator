import React from 'react'
import {View, StyleSheet, FlatList, Dimensions} from 'react-native'
import CryptoJS from 'crypto-js'
import {DigitButton, Notification, StyledText} from '../common'
import {colors} from '../styles'
import LocalStorage from '../../utils/LocalStorage'
import {errors, digits} from '../../constants'

export const userStatus = {
  NEW_USER: "NEW_USER"
}

class Login extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.pinConfirm !== nextProps.pinConfirm)
      return false

    if (this.props.userStatus !== nextProps.userStatus && this.props.userStatus.length > 0)
      return false

    return true
  }

  //1. check if user has pin on the device
  componentDidMount() {
    const ls = new LocalStorage()
    ls.load('lsPIN')
      .then(data => {
        //console.log("pin info is stored", data)
      })
      .catch(err => {
        //console.log("Device is not registered", err)
        this.props.setUserStatus(userStatus.NEW_USER)
      })
  }

  //2. depending on user status navigate the user
  onPinSubmit = () => {
    //user is registering for the first time
    if (this.props.userStatus === userStatus.NEW_USER) {
      if (this.props.pinConfirm === '') {
        //console.log("entering repeat mode")
        this.props.setPinConfirm(this.props.pin)
        this.props.setPin('')
        return
      }
      if (this.props.pin === this.props.pinConfirm) {
        //console.log("this.props.pin === this.props.pinConfirm. Loging in")
        this.onUserLogin()
        return
      } else {
        //console.log("pins mismatch")
        this.props.setPinError(true)
        return
      }
    }

    //console.log("submit registered user")
    //user is registered and logs in
    return this.onSubmitUser()
  }

  //3. existing user logging in
  onSubmitUser = () => {
    const ls = new LocalStorage()
    ls.load('lsPIN')
      .then(lsPING => {
        //error if oins do not match
        if (JSON.parse(lsPING) !== this.props.pin) {
          this.props.setPinError(true)
          return
        }

        //check if user has accounts
        ls.load('isRegistered')
          .then(keys => {
            //User has accounts
            console.log("tries to decryot keys", keys)
            const bytes  = CryptoJS.AES.decrypt(JSON.parse(keys), this.props.pin);
            const encodedKeys = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
            if (encodedKeys && encodedKeys.key) {
              this.onUserLogin({hasRegisteredAccount: true})
            }
          })
          .catch(e => {
            //User does not have accounts
            console.log("User does not have accounts")
            this.onUserLogin()
          })
      })
      .catch(e => {
        //console.log("wrong pin")
        this.props.setPinError(true)
      })
  }

  //4. successful login of both typed of users
  onUserLogin = (params) => {
    const ls = new LocalStorage()
    ls.save('lsPIN', this.props.pin)

    if (this.props.setPinCode instanceof Function)
      this.props.setPinCode(this.props.pin)

    this.props.navigation.navigate('IndexScreen', {...params})
  }

  onEnterPin = (i) => {
    if (this.props.pin.length === 4) return null
    this.props.setPin(`${this.props.pin}${i}`)
  }

  renderPinField = () => {
    let content = [
      <View key={`pinBtn-0`} style={styles.pinDigit}/>,
      <View key={`pinBtn-1`} style={styles.pinDigit}/>,
      <View key={`pinBtn-2`} style={styles.pinDigit}/>,
      <View key={`pinBtn-3`} style={styles.pinDigit}/>
    ]

    if (this.props.pin.length > 0) {
      for (let i = 0; i < this.props.pin.length; i++) {
        content[i] = <View key={`pinBtnFilled-${i}`} style={styles.pinDigitFilled}/>;
      }

      if (this.props.pin.length === 4) {
        setTimeout(this.onPinSubmit, 200)
      }
    }

    return (
      <View style={styles.pinContainer}>
        <View style={styles.pinContInner}>
          {content}
        </View>
      </View>
    )
  }

  renderHeader = () => {
    return (
      <View style={styles.HeaderCont}>
        <View style={styles.HeaderTextContainer}>
          {this.props.pinConfirm.length > 0 && <StyledText customStyles={styles.RepeatText}>Repeat</StyledText>}
        </View>
        <View style={styles.HeaderTextContainer} >
          <StyledText customStyles={styles.HeaderText}>Enter your PIN number</StyledText>
        </View>
        {this.renderPinField()}
      </View>
    )
  }

  resetState = () => {
    this.props.setPin('')
    this.props.setPinConfirm('')
    this.props.setPinError(false)
  }

  render() {
    if (this.props.pinError)
      return (
        <View style={styles.Container}>
          <Notification errorMsg={errors.WRONG_PIN} onPress={this.resetState}/>
        </View>
      )

    const margin = 30

    return (
      <View style={styles.Container}>
        {this.renderHeader()}
        <View style={styles.btnContainer}>
          <View style={styles.btnContainerInner} width={Dimensions.get('window').width - margin}>
            <FlatList
              data={digits}
              renderItem={({item}) => <DigitButton key={`digit-${item}`} digit={item} onClick={() => this.onEnterPin(item)} />}
              keyExtractor={(item, index) => index}
              numColumns={3} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  Container: {
    flex: 1,
    backgroundColor: colors.theme
  },
  RepeatText: {
    fontWeight: '700',
    color: colors.white,
    fontSize: 29
  },
  HeaderText: {
    color: colors.white,
    fontSize: 29,
    letterSpacing: 1
  },
  HeaderCont: {
    paddingVertical: 30,
    height: 200,
  },
  HeaderTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pinDigit: {
    height: 12,
    width: 12,
    borderRadius: 6,
    borderColor: colors.white,
    borderWidth: 0.5,
    backgroundColor: 'transparent'
  },
  pinDigitFilled: {
    height: 12,
    width: 12,
    borderRadius: 6,
    borderColor: colors.white,
    borderWidth: 0.5,
    backgroundColor: colors.white,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainerInner: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 5
  },
  pinContInner: {
    width: 160,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center'
  },
  progress: {
    margin: 10,
  },
})

export default Login
