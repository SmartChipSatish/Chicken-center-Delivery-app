import React from 'react'
import { View, Text, Platform ,StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { THEME_COLORS } from '../../../globalStyles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
interface cardProps{
   title:String,
   value:String
 }

const Card:React.FC<cardProps>=({title,value})=> {
  const navigate :any= useNavigation()
  return (
    <View style={styles.CardContainer} >
      <Text style={styles.CardTitle}>{title}</Text>
      <Text style={styles.CardValue}>{value}</Text>
      {
        title && title === 'Total orders' && 
      <TouchableOpacity style={styles.viewAllContainer} onPress={()=> navigate.navigate('orderList')}>
        <Text style={styles.viewAllText}>More</Text>
        <Icon name="arrow-forward-outline" size={15} color={THEME_COLORS.secondary} />
      </TouchableOpacity>
      }
    </View>
  )
}

const styles =  StyleSheet.create({
   CardContainer:{
      flex:1,
      justifyContent:'space-around',
      paddingHorizontal:10,
      borderRadius:5,
      borderBlockColor:'#000',
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 10,
      shadowRadius: 10,
      elevation: 4,
   },
   CardTitle:{
      fontSize:18,
      color:"#000",
      fontWeight:'bold',
      alignSelf:'flex-start'
   },
   CardValue:{
      fontSize:30,
      color:THEME_COLORS.secondary,
      fontWeight:'bold',
      alignSelf:'center'
   },
   viewAllContainer:{
    alignSelf:'flex-end',
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end'
   },
   viewAllText:{
    fontSize:15,
    color:"#000",
    fontWeight:'bold',
    justifyContent:'flex-end'
   }

})

export default Card