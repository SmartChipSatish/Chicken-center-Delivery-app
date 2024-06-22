import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TEXT_COLORS, THEME_COLORS } from '../globalStyles/GlobalStyles'

interface CustomHeaderProps{
   tittle:String,
   Navigate:String
}

 const  CustomHeader:React.FC<CustomHeaderProps> = ({tittle,Navigate})=> {
   const navigation :any= useNavigation();
  return (
   <View style={styles.header}>
   <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(Navigate)}>
     <Icon name="arrow-back" size={24} color="#fff" />
   </TouchableOpacity>
   <Text style={styles.headerText}>{tittle}</Text>
 </View>
  )
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: height * 0.08,
    backgroundColor: THEME_COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 10,
    padding: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_COLORS.whiteColor,
    textTransform:'uppercase'
  },
})

export default CustomHeader

