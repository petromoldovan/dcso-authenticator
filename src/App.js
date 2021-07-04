import React from 'react'
import { Provider } from 'react-redux'
import {View, StyleSheet} from 'react-native'
//import {SafeAreaView} from 'react-navigation'
import store from './store/store'
import {AppNavigator} from './router/router'
import {colors} from "./components/styles/index";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


const App = () => (
  <Provider store={store}>
    <View style={styles.safeArea}>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
      {/*<SafeAreaView style={styles.flex}>*/}
      {/*  <AppNavigator />*/}
      {/*</SafeAreaView>*/}
    </View>
  </Provider>
)

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.theme
  }
})

export default App
