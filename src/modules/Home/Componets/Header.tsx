import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import AccountIcon from '../../../assets/Iocns/Account';
import { THEME_COLORS } from '../../../globalStyles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation :any= useNavigation()
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/logo.png')} style={styles.logoImage}/>
        <Text style={styles.logo}>KMMC</Text>
      </View>
      <TouchableOpacity style={styles.accountIcon} onPress={()=> navigation.navigate('Profile')}>
         <AccountIcon fill={THEME_COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage:{
    width:50,
    height:50,
    resizeMode:'contain'
  },
  logo: {
    fontSize: 20,
    color:THEME_COLORS.primary,
    fontWeight: 'bold',
  },
  accountIcon: {
    padding: 5,
  },
});

export default Header;
