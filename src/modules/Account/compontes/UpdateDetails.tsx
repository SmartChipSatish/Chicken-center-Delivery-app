import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../../Hooks/CustomHeader'
import { TextInput } from 'react-native-gesture-handler'
import { THEME_COLORS } from '../../../globalStyles/GlobalStyles'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';


export default function UpdateDetails() {
  const user = useSelector((state:any)=>state?.reusableStore?.userInfo)
  const [name, setName] = useState(user?.name);
  const [userName, setUserName] = useState(user?.userName);
  const [primaryNumber, setPrimaryNumber] = useState(user?.primaryNumber);
  return (
    <View>
      <CustomHeader tittle='Update Profile' Navigate='Profile' />
      <View style={styles.profileDetails}>
          <Image source={require('../../../assets/User.webp')} style={styles.profileImage} />
          <TouchableOpacity style={styles.editIcon} >
              <Icon name="edit"  color="#fff" />
          </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLable} >userName :</Text>
          <TextInput
            style={styles.input}
            placeholder="userName"
            value={userName}
            placeholderTextColor='#000'
            keyboardType='default'
            onChangeText={(e) => { setUserName(e) }}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLable} >Name :</Text>
          <TextInput
            style={styles.input}
            placeholder="userName"
            value={name}
            placeholderTextColor='#000'
            keyboardType='default'
            onChangeText={(e) => { setName(e) }}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLable} >primaryNumber :</Text>
          <TextInput
            style={styles.input}
            placeholder="primaryNumber"
            value={primaryNumber}
            placeholderTextColor='#000'
            keyboardType="numeric"
            onChangeText={(e) => { setPrimaryNumber(e) }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Update Order</Text>
      </TouchableOpacity>
    </View>
  )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  profileDetails: {
    flexDirection: 'row',
    alignSelf:'center',
    marginBottom: 16,
    marginTop:10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 8,
},
  inputContainer: {
    flexDirection: 'column',
    alignItems:'center',
    marginTop: 16,
    marginBottom: 16,
  },
  inputWrapper:{
    width:"80%",
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
});
