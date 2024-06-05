import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../modules/Login/Login'
import HomeScreen from '../modules/Home/Home';
import OrderDetails from '../modules/Home/OrderDetails';
import UserProfile from '../modules/Account/Account';
import UpdateDetails from '../modules/Account/compontes/UpdateDetails';
import Terms from '../modules/Account/compontes/Terms';
import ChangePassword from '../modules/Account/compontes/ChangePassword';
import Privacy from '../modules/Account/compontes/Privacy';
import Faqs from '../modules/Account/compontes/Faqs';
import OrderList from '../modules/Home/OrderList';

const Stack = createStackNavigator();

export default function ScreensNavigations() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Order' component={OrderDetails} options={{ headerShown: false }} />
      <Stack.Screen name='Profile' component={UserProfile} options={{ headerShown: false }} />
      <Stack.Screen name='updateUser' component={UpdateDetails} options={{ headerShown: false }} />
      <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ headerShown: false }} />
      <Stack.Screen name='Terms' component={Terms} options={{ headerShown: false }} />
      <Stack.Screen name='Privacy' component={Privacy} options={{ headerShown: false }} />
      <Stack.Screen name='Faqs' component={Faqs} options={{ headerShown: false }} />
      <Stack.Screen name='orderList' component={OrderList} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}