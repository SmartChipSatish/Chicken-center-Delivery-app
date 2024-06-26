import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomHeader from '../../../Hooks/CustomHeader'
import { useDispatch, useSelector } from 'react-redux';
import { THEME_COLORS } from '../../../globalStyles/GlobalStyles';
import { ShowToster } from '../../Utiles'
import { useToast } from 'react-native-toast-notifications'

export default function ChangePassword() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast()
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword:'',
  });
  const inputRef: any = useRef(null);


  const validateFields = () => {
    let valid = true;
    let errorsCopy = {
      currentPassword: '',
      newPassword: '',
      confirmPassword:'',
    };
    if (!currentPassword || !newPassword || !confirmPassword) {
      ShowToster(toast,'All fields are required.','' ,'error')
      valid = false;
      return;
    }
    if (newPassword !== confirmPassword) {
      errorsCopy.confirmPassword = 'New password and confirm password do not match.'
      errorsCopy.newPassword = 'New password and confirm password do not match.'
      valid = false;
    }
    if (newPassword.length < 6) {
      errorsCopy.newPassword = 'New password must be at least 6 characters long.'
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  };

  const updatePasswordHandler = async () => {
    Keyboard.dismiss()
    if (inputRef.current) {
      inputRef.current.blur();
    }
    if (validateFields()) {
      let payload: any = {
        id: user?._id,
        body: {
          currentPassword,
          newPassword,
        }
      };

      try {
        // const response = await dispatch(updatePassword(payload)).unwrap();
        Alert.alert('Success', 'Password updated successfully.');
        setConfirmPassword('')
        setCurrentPassword('')
        setNewPassword('')
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to update password.');
      }
    }
  };

  return (
    <View >
    <CustomHeader tittle='Change Password' Navigate='Profile' />
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
      <Text style={styles.inputLable} >Current Password :</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        placeholderTextColor='#000'
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry={true}
        ref={inputRef}
      />
      </View>
      <View style={styles.inputWrapper}>
      <Text style={styles.inputLable} >New Password :</Text>
      <TextInput
        placeholder="New Password"
        placeholderTextColor='#000'
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
        style={styles.input}
        ref={inputRef}
      />
      </View>
      {errors.newPassword ? <Text style={styles.errorText}>{errors.newPassword}</Text> : null}
      <View style={styles.inputWrapper}>
      <Text style={styles.inputLable} >Confirm New Password :</Text>
      <TextInput
        placeholder="Confirm New Password"
        placeholderTextColor='#000'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        style={styles.input}
        ref={inputRef}
      />
      </View>
      {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
    </View>
    <TouchableOpacity style={styles.button} onPress={()=>updatePasswordHandler()}>
            <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent:'center',
    padding: 16,
  },
  inputWrapper:{
    width:"100%",
    marginBottom:20
  },
  inputLable:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    width:"100%",
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 4,
    padding: 10,
    color: "#000",
    marginTop:10
  },
  button: {
    backgroundColor: THEME_COLORS.secondary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal:30
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
    marginLeft: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  }
});