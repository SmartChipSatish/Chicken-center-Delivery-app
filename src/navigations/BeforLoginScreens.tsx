import React, { useEffect } from 'react'
import LoginScreen from '../modules/Login/Login'
import { createStackNavigator } from '@react-navigation/stack';
import ScreensContainer from './ScreensContainer';

const Stack = createStackNavigator();

export default function BeforLoginScreens() {
  return (
   <Stack.Navigator>
   <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
   <Stack.Screen name='Main' component={ScreensContainer} options={{ headerShown: false }} />
 </Stack.Navigator>
  )
}