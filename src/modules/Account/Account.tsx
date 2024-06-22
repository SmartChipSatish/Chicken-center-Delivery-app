import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import EditIcon from 'react-native-vector-icons/FontAwesome';
import { THEME_COLORS } from '../../globalStyles/GlobalStyles';
import CustomHeader from '../../Hooks/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../../store/slices';

interface UserProfileProps {
  profileUrl: string;
  username: string;
  phone: string;
  email: string;
}

const UserProfile: React.FC<UserProfileProps> = () => {
  const navigation :any= useNavigation();
  const user = useSelector((state:any)=>state?.reusableStore?.userInfo)
  const dispatch = useDispatch()

  const Logout = async() =>{
    await AsyncStorage.clear()
    dispatch(setUser(''))
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  return (
    <View style={styles.container}>
      <CustomHeader tittle='Profile' Navigate='Home' />
      <View style={styles.content}>
        <View style={styles.profileDetails}>
          <Image source={ user?.profileUrl ? {uri:user?.profileUrl}: require('../../assets/User.webp')} style={styles.profileImage} />
          <View style={styles.detailsContainer}>
            <Text style={styles.username}>{user?.name}</Text>
            <Text style={styles.detail}>{user?.email || user?.primaryNumber}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('updateUser')}>
              <EditIcon name="edit" size={25} color={THEME_COLORS.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
            <TouchableOpacity style={styles.listItem} onPress={()=>navigation.navigate('ChangePassword')}>
              <Text style={styles.listItemText}>Change Password</Text>
              <Icon name="arrow-forward-outline" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem} onPress={()=>navigation.navigate('Terms')}>
              <Text style={styles.listItemText}>Terms & Conditions</Text>
              <Icon name="arrow-forward-outline" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem} onPress={()=>navigation.navigate('Privacy')}>
              <Text style={styles.listItemText}>Privacy Ploicy</Text>
              <Icon name="arrow-forward-outline" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem} onPress={()=>navigation.navigate('Faqs')}>
              <Text style={styles.listItemText}>FAQs</Text>
              <Icon name="arrow-forward-outline" size={20} color="#000" />
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listContainer1}>
          <TouchableOpacity style={styles.listItem} onPress={Logout}>
            <Text style={styles.listItemText}>Logout</Text>
            <Icon name="arrow-forward-outline" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem1}>
            <Text style={[styles.listItemText,styles.bold,{color:'#000'}]}>Designed & Developed BY</Text>
            <Text style={[styles.listItemText,styles.bold,{color:'#000'}]}>SmartChip Technologies</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
    justifyContent:'center'
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color:"#000"
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color:"#000"
  },
  bold: {
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  listContainer1:{
    alignContent:'flex-end',
    padding:20
  },
  listItem1:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    marginTop:10,
    borderTopColor:'#000',
    color:"#fff",
    backgroundColor:THEME_COLORS.secondary
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16
  },
  listItemText: {
    fontSize: 16,
    color:"#000"
  },
  button: {
    alignSelf: 'flex-start',
    padding: 8,
    marginTop:10,
    borderRadius: 4,
 },
 buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 2
 },
});

export default UserProfile;
