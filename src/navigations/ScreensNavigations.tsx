import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from '../store/store';
import ScreensContainer from './ScreensContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import BeforLoginScreens from './BeforLoginScreens';
import { ToastProvider } from 'react-native-toast-notifications';
import CustomToast from '../Hooks/CustomToast';


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
      <ToastProvider
        renderType={{
          custom_type: (toast) => (
            <CustomToast
              message={toast.message}
              title={toast.data?.title}
              type={toast.data?.type}
              color={toast.data?.color}
              sideColor={toast.data?.sideColor}
            />
          )
        }}
      >
        { login ? <ScreensContainer /> : <BeforLoginScreens/> } 
      </ToastProvider>
      </NavigationContainer>
    </Provider>
  )
}