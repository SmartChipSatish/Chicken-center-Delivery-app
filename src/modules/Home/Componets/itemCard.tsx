import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME_COLORS } from '../../../globalStyles/GlobalStyles';
import {formatTimestamp} from '../../Utiles';

interface ItemsProps {
   itemName: string;
   orderDetails: string;
   timeStamp: String,
   userDetails: any,
   i:any
   addressId:any
   onViewPress: () => void;
}

const ItemCard: React.FC<ItemsProps> = ({ itemName, orderDetails, timeStamp, userDetails,i,addressId, onViewPress }) => {

   const getLocation = async(userDetails:any)=>{
      if(userDetails?.secondaryAddress){
         const location = userDetails?.secondaryAddress?.filter((address:any)=>address?._id === addressId)
         return location?.length > 0 ? location[0].city  : 'No Address'
      }
   }

   return (
      <View style={styles.card} key={i}>
         <View style={styles.content}>
            <Text style={styles.itemName}>{itemName}</Text>
            <Text>
               <Text style={styles.bold}>Order Time: </Text>
               <Text style={styles.orderDetails}>{formatTimestamp(timeStamp)}</Text>
            </Text>
            <Text>
               <Text style={styles.bold}>Assigned By: </Text>
               <Text style={styles.orderDetails}>{orderDetails}</Text>
            </Text>
            {/* <Text>
               <Text style={styles.bold}>Location: </Text>
               <Text style={styles.orderDetails}>{ userDetails?.primaryAddress?.name || userDetails?.secondaryAddress?.length > 0  && getLocation(userDetails)}</Text>
            </Text> */}
            <TouchableOpacity style={styles.button} onPress={onViewPress}>
               <Text style={styles.buttonText}>Start Delivery</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#f0f0f0',
   },
   card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 10,
      shadowRadius: 10,
      elevation: 4,
   },
   content: {
      flex: 1,
      gap:10
   },
   itemName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: THEME_COLORS.secondary,
   },
   bold: {
      color: '#000',
      fontWeight: 'bold',
   },
   orderDetails: {
      fontSize: 14,
      color: '#000',
   },
   button: {
      width:'100%',
      backgroundColor: THEME_COLORS.secondary,
      padding: 8,
      borderRadius: 4,
   },
   buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      textAlign:'center',
      letterSpacing:2
   },
});

export default ItemCard