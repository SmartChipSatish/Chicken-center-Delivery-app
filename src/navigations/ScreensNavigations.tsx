import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from '../store/store';
import ScreensContainer from './ScreensContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import BeforLoginScreens from './BeforLoginScreens';

export default function ScreensNavigations() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  const Checkuser = async () => {
    const Accesstoken = await AsyncStorage.getItem('Accesstoken');
    if(Accesstoken){
      setLogin(true);
    }
  }
  
  useEffect(() => {
    Checkuser();
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
       { login ? <ScreensContainer /> : <BeforLoginScreens/> } 
      </NavigationContainer>
    </Provider>
  )
}