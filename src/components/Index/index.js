import React from 'react'
import { connect } from 'react-redux'
import {View, TouchableOpacity, StyleSheet, Image, Alert, TouchableWithoutFeedback, Platform, BackHandler} from 'react-native'
import Swipeout from 'react-native-swipeout'
import {compose, lifecycle, withHandlers} from 'recompose'
import {colors} from '../styles/index'
import Index from './IndexComponent'
import plusIcon from '../../assets/add-accout-plus-icon.png'
import plusIconBlue from '../../assets/add-new-accout-blue.png'
import LocalStorage from '../../utils/LocalStorage'
import {setUserAccounts} from '../../actions/state'
import arrowIcon from '../../assets/arrow-grey.png'
import {StyledText} from "../common";

let gravatarApi = require('gravatar-api')

function mapStateToProps(state) {
  const userAccounts = state.getIn(['coreReducer', 'userAccounts'], [])

  return {
    userAccounts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserAccounts: (users) => dispatch(setUserAccounts(users)),
  }
}

let listener = null
const makeWithLyfecycle = lifecycle({
  componentDidMount() {
    //handle Android back button press
    if (Platform.OS === "android" && listener === null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        return false
      })
    }
  }
})

const makeWithHandlers = withHandlers({
  renderAddAccountButton: ({navigation}) => (themeColor = false) => {
    let registrationBtnContainer = [styles.registrationBtn];
    let registrationTextStyle = [styles.RegistrationText];
    let imgUrl = plusIcon;
    if (themeColor) {
      registrationBtnContainer.push(styles.registrationBtnTheme)
      registrationTextStyle.push(styles.RegistrationTextTheme)
      imgUrl = plusIconBlue;
    }

    return(
      <TouchableOpacity
        style={registrationBtnContainer}
        onPress={() => navigation.navigate('ScannerScreen')}>
        <View style={styles.btnRegistration}>
          <View style={styles.flex} />
          <View style={styles.RegistrationIcon}>
            <Image style={styles.addBtn} source={imgUrl} />
          </View>
          <View style={styles.RegistrationTextContainer}>
            <StyledText customStyles={registrationTextStyle}>
              Add new account
            </StyledText>
          </View>
        </View>
      </TouchableOpacity>
    )
  },
  renderUserAccounts: ({userAccounts, setUserAccounts, navigation}) => () => {
    return userAccounts.map((elem, IDX) => {
        const swipeoutBtns = [
          {
            text: 'Delete',
            type: 'delete',
            onPress: () => {
              Alert.alert(
                `Deleting user ${elem.first_name}`,
                'Are you sure you want to proceed?',
                [
                  {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                  {text: 'OK', onPress: () => {
                    const newUsers = userAccounts
                      .map(user => {
                        if (user.id !== elem.id) {
                          return user
                        }
                      })
                      .filter(user => user)

                    if (setUserAccounts instanceof Function) setUserAccounts(newUsers)
                    const ls = new LocalStorage();
                    ls.save('accounts', newUsers);

                    if (newUsers.length === 0) {
                      ls.remove('isRegistered')
                    }
                  }},
                ],
                { cancelable: false }
              )
            }
          }
        ]

        return(
          <Swipeout
            key={`${IDX}${elem.id}${elem.first_name}`}
            close={true}
            right={swipeoutBtns}
            style={styles.swipeContainer}
            backgroundColor={colors.g1}>
            <TouchableWithoutFeedback
              onPress={() => Platform.OS === 'android' ?
                navigation.dispatch({
                  key: 'scanner',
                  type: 'ReplaceLastScreen',
                  routeName: 'scanner',
                  params: {scanWithUserID: elem.id}
                }) :
                navigation.navigate('scanner', {scanWithUserID: elem.id})}
              style={styles.AccountContainer}>
              <View style={styles.bioContainer}>
                <View style={styles.GravarContainer}>
                  <Image style={styles.avatarIconStyle}
                         source={{uri: gravatarApi.imageUrl({
                           email: elem.email || `${IDX}random@gmail.com`,
                           parameters: { "d": "identicon" },
                           secure: true
                         })}} />
                </View>
                <View style={styles.NameContainer}>
                  <StyledText customStyles={styles.NameStyle}>{`${elem.last_name} ${elem.first_name}`}</StyledText>
                </View>
                <View style={styles.ArrowContainer}>
                  <Image source={arrowIcon} style={styles.ArrowStyle} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Swipeout>
        )
      }
    )
  }
})


const styles = StyleSheet.create({
  flex: {
    flex:1
  },
  GravarContainer: {
    backgroundColor: 'transparent',
  },
  NameContainer: {
    paddingLeft: 20
  },
  bioContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    paddingVertical: 10
  },
  swipeContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.g2,
  },
  AccountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 1
  },
  ArrowStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  ArrowContainer: {
    marginLeft: 'auto'
  },
  registrationBtn: {
    borderColor: colors.white,
    borderWidth: 2,
    height: 250,
    width: 210,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 10
  },
  NameStyle: {
    fontWeight: '700',
    color: colors.black,
    fontSize: 21,
    letterSpacing: 1
  },
  registrationBtnTheme: {
    borderColor: colors.theme,
    marginBottom: 15
  },
  addBtn: {
    width: 80,
    height: 80,
  },
  btnRegistration: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  RegistrationTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10
  },
  RegistrationIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  RegistrationText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 20
  },
  RegistrationTextTheme: {
    color: colors.theme,
  },
  avatarIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  makeWithLyfecycle,
  makeWithHandlers
)(Index)
