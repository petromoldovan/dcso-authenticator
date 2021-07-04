import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/Login';
import ErrorScreen from '../components/ErrorScreen';
import IndexScreen from '../components/Index';

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="LoginScreen" headerMode="none">
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="IndexScreen" component={IndexScreen} />
    <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
  </Stack.Navigator>
)
