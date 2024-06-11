import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid, Platform,
} from 'react-native';
import ScreensNavigations from './src/navigations/ScreensNavigations';
import usePushNotification from './src/modules/notification/usePushNotification';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

function App(): React.JSX.Element {

  useEffect(() => {
    requestLocationPermission();
  }, []);


  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      } else if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        requestUserPermission();
        getFCMToken();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);
  return (
    <ScreensNavigations />
  );
}

export default App;
