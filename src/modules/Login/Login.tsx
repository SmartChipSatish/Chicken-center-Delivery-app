import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {THEME_COLORS } from '../../globalStyles/GlobalStyles';
import CustomText from '../../Hooks/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUserloginMutation } from '../../store/services/ServiceApis';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../../store/slices';

export default function Login() {
  const navigation :any= useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = useUserloginMutation()
  const dispatch :any= useDispatch()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!userName && !password) {
      console.log('Enter Your Details')
    } else if (!userName) {
      console.log('Enter Your UserName')
    } else if (!password) {
      console.log('Enter Your Password')
    } else {
      try {
        const response = await loginUser(
          {
            userName: userName,
            password: password
          }
        ).unwrap();
        if (response && response?.accessToken) {
          dispatch(setUser(response?.userInfo))
         await AsyncStorage.setItem('Accesstoken',JSON.stringify(response?.accessToken))
         await AsyncStorage.setItem('RefreshToken',JSON.stringify(response?.refreshToken))
         await AsyncStorage.setItem('userInfo',JSON.stringify(response?.userInfo))
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/bg.png')}
        style={styles.backgroundImage}
      >
        <CustomText style={styles.title}>Hey, Hello 👋</CustomText>
        <Text style={styles.summary}>Enter your credentials to access your account</Text>
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <CustomText style={styles.label}>Email address</CustomText>
            <TextInput
              style={styles.textInput}
              value={userName}
              placeholderTextColor="#000"
              placeholder="Enter Your Email"
              onChangeText={setUserName}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputPasswordContainer}>
            <CustomText style={styles.label}>Password</CustomText>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Enter your password"
                placeholderTextColor="#000"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Icon name={showPassword ? "eye" : "eye-off"} size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.08,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  summary: {
    fontSize: width * 0.05,
    color: '#000',
    marginBottom: height * 0.03,
  },
  inputWrapper: {
    marginBottom: height * 0.03,
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  inputPasswordContainer:{
    marginBottom: 0,
  },
  label: {
    fontSize: width * 0.05,
    color: '#000',
    marginBottom: height * 0.01,
  },
  textInput: {
    fontSize: width * 0.05,
    padding: height * 0.01,
    borderRadius: 3,
    borderWidth: 0.5,
    color: '#000',
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: height * 0.00,
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  inputPassword: {
    flex: 1,
    fontSize: width * 0.05,
    height: '100%',
    paddingHorizontal: width * 0.02,
    color: '#000',
  },
  eyeIcon: {
    padding: height * 0.01,
  },
  eyeIconText: {
    fontSize: width * 0.05,
    textTransform: 'capitalize',
  },
  loginButton: {
    backgroundColor: THEME_COLORS.secondary,
    padding: height * 0.01,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: width * 0.07,
    letterSpacing:2,
  },
});

