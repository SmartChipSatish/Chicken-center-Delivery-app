import React, { useEffect } from 'react'
import HomeScreen from '../modules/Home/Home';
import OrderDetails from '../modules/Home/OrderDetails';
import UserProfile from '../modules/Account/Account';
import UpdateDetails from '../modules/Account/compontes/UpdateDetails';
import Terms from '../modules/Account/compontes/Terms';
import ChangePassword from '../modules/Account/compontes/ChangePassword';
import Privacy from '../modules/Account/compontes/Privacy';
import Faqs from '../modules/Account/compontes/Faqs';
import OrderList from '../modules/Home/OrderList';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices';

const Stack = createStackNavigator();
export default function ScreensContainer() {
  const dispatch = useDispatch()

  async function getuserFromlocal() {
    const localuser:any = await AsyncStorage.getItem('userInfo')
    const userInfo = JSON.parse(localuser)
    dispatch(setUser(userInfo))
  }

  useEffect(()=>{
    getuserFromlocal()
  },[])

  return (
   <Stack.Navigator>
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
  )
}