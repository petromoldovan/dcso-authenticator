// import React from 'react'
//import {StyleSheet, Easing, Animated} from 'react-native'
// import { StackNavigator } from 'react-navigation'
// import LoginScreen from '../components/Login'
// import IndexScreen from '../components/Index'
// import TransactionScreen from '../components/Transaction'
// import ScannerScreen from '../components/Scanner'
// import RegistrationScreen from '../components/Registration'
// import ErrorScreen from '../components/ErrorScreen'
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ErrorScreen from '../components/ErrorScreen';

// const styles = StyleSheet.create({
//   stackContainer: {
//     backgroundColor: '#000',
//     elevation: 0,
//     shadowOpacity: 0,
//   },
// });

const AppNavigatorStackConfig = {
  headerMode: 'none',
  //cardStyle: styles.stackContainer,
  initialRouteName: 'login',
  navigationOptions: {
    gesturesEnabled: false
  },
}

// export const AppNavigator = StackNavigator({
//     // login: { screen: LoginScreen },
//     // index: { screen: IndexScreen },
//     // transaction: { screen: TransactionScreen },
//     // scanner: {screen: ScannerScreen},
//     // registration: {screen: RegistrationScreen},
//     // errorScreen: {screen: ErrorScreen}
//   },
//   {
//     ...AppNavigatorStackConfig
//   }
// )

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="ErrorScreen">
    <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
  </Stack.Navigator>
)


export const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    },
  }
}

// const prevGetStateForActionHomeStack = AppNavigator.router.getStateForAction;
// AppNavigator.router.getStateForAction = (action, state) => {
//   if (action.type === 'Navigation/COMPLETE_TRANSITION' || action.type === 'Navigation/BACK') {
//     return null
//   }
//
//   // prevent pushing the same routes to the navStack.
//   if (state && action.type === 'ReplaceLastScreen') {
//     const routes = state.routes.slice(0, state.routes.length - 1)
//
//     let existingRoute = {}
//     for (let i = 0; i < routes.length; i++) {
//       if (routes[i].routeName === action.routeName) {
//         existingRoute = {
//           isInStack: true,
//           IDX: i
//         }
//         break
//       }
//     }
//
//     //push new route to stack if does not exist there
//     if (!existingRoute.isInStack) {
//       routes.push(action)
//     }
//
//     return {
//       ...state,
//       routes,
//       index: existingRoute.isInStack ? existingRoute.IDX : routes.length - 1
//     }
//   }
//
//   return prevGetStateForActionHomeStack(action, state);
// }
