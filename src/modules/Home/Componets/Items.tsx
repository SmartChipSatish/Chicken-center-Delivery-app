import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetOrdersMutation } from '../../../store/services/ServiceApis';
import { useSelector,useDispatch } from 'react-redux';
import { setordesCount,setLoading } from '../../../store/slices';
import { formatDate, formatTimestamp } from '../../Utiles';
import { THEME_COLORS } from '../../../globalStyles/GlobalStyles';

interface ItemsProps {
   listName: string;
}

const Items: React.FC<ItemsProps> = ({listName}) => {
   const navigate: any = useNavigation()
   const [ordersListApi] = useGetOrdersMutation() 
   const [ordersList, setOrdersList] = useState<any[]>([]);
   const [viewOrders, setViewOrders] = useState<any[]>([]);
   const user = useSelector((state:any)=>state?.reusableStore?.userInfo)
   const dispatch = useDispatch()

   const getOrdersList = async()=>{
      dispatch(setLoading(true))
      const response = await ordersListApi(user?._id)
      if(response){
         setOrdersList(response?.data)
         if(listName === 'inComplete'){
            const filterData = await response?.data?.filter((item:any)=>item.orderStatus == 'In Process')
            setViewOrders(filterData)
         }
      }
      setTimeout(()=>{
         dispatch(setLoading(false))
      },1000)
   }


   const getAllOrders = async (listName:String) => {
      if(ordersList?.length > 0){
         dispatch(setLoading(true))
         let filterKey:any;
         if(listName == 'Cancelled'){
            filterKey = 'Cancelled'
         }else if(listName == 'inComplete'){
            filterKey = 'In Process'
         }else if (listName == 'Completed'){
            filterKey = 'DELIVERD'
         }
         const filterData = await ordersList?.filter((item:any)=>item.orderStatus == filterKey)
         console.log('filterData: ', filterData);
         setViewOrders([...filterData])
         dispatch(setLoading(false))
      }else{
         getOrdersList()
      }
   }

   useEffect(()=>{
      getAllOrders(listName)
   },[user,listName])

return (
   <>
   {
      viewOrders?.length > 0 && viewOrders?.map((item:any,i:any) => {
         return (
            <View style={styles.card} key={i}>
            <View style={styles.content}>
               <Text style={[styles.bold,{color:THEME_COLORS.secondary},{fontSize:20}]}>{`# ${item._id}`}</Text> 
               <Text>
                  <Text style={styles.orderDetails}>OrderTime: </Text>
                  <Text style={styles.bold}>{formatTimestamp(item.date)}</Text>
               </Text>
               <Text>
                  <Text style={styles.orderDetails}>OrderDate: </Text>
                  <Text style={styles.bold}>{formatDate(item.date)}</Text>
               </Text>
               <Text>
                  <Text style={styles.orderDetails}>AssignedBy: </Text>
                  <Text style={[styles.bold,styles.capitalizeText]}>{item.franchiseId.name}</Text>
               </Text>
               <View style={styles.inline}>
              <Text style={styles.orderDetails}>Payment Status: </Text>
              <Text style={[
                  styles.orderDetails, 
                  item.paymentStatus === 'PENDING' ? styles.badgePending 
                     : item.paymentStatus === 'Cancelled' ? styles.badgeCanceled 
                     : styles.badgePaid
                  ]}>
                {item.paymentStatus}
              </Text>
            </View>
            <View style={styles.inlineButtons}>
               <Text style={[
                  styles.orderDetails, 
                     item.orderStatus === 'In Process' ? styles.badgePending 
                     : item.orderStatus === 'Cancelled' ? styles.badgeCanceled 
                     : styles.badgePaid, 
                     {marginLeft: 0},
                     {display:'flex'}
                  ]}>
                {item.orderStatus}
              </Text>
              <TouchableOpacity style={[styles.button, (item.orderStatus === 'Cancelled' || item.orderStatus !== 'In Process') && {opacity:0.5} ]} onPress={() => {item.orderStatus === 'In Process' ? navigate.navigate('Order', { item }) : " "}} disabled={item.orderStatus !== 'In Process' ? true : false}>
                <Text style={styles.buttonText}>
                  {item.orderStatus === 'In Process' ? 'Start Devlivery'
                     : item.orderStatus === 'Cancelled' ? 'Cancelled' : 'Completed' }
                </Text>
              </TouchableOpacity>
            </View>
            </View>
         </View>
      )})
   }
   {
      viewOrders?.length == 0 && <View style={{
         flex:1,
         alignItems:'center',
         justifyContent:'center'
         }}>
         <Text style={styles.bold}>{`No ${listName} Orders`} </Text>
      </View>
   }
   </>
)};

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
      shadowColor: '#2b2d42',
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
      fontSize:17
   },
   orderDetails: {
      fontSize: 14,
      color: '#000',
   },
   button: {
      alignSelf:'flex-end',
      backgroundColor: THEME_COLORS.secondary,
      padding: 8,
      borderRadius: 4,
   },
   buttonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
      textAlign:'center',
      letterSpacing:2
   },
   capitalizeText:{
      textTransform:'capitalize'
   },
   inline: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inlineButtons:{
     flexDirection: 'row',
     alignItems:'center',
     justifyContent: 'space-between',
     marginTop: 3,
    },
    badgePending: {
      backgroundColor: '#FEEBC8', 
      color: '#DD6B20' ,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      overflow: 'hidden',
      marginLeft: 10,
    },
    badgePaid: {
      backgroundColor: '#C6F6D5',
      color: '#38A169',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      overflow: 'hidden',
      marginLeft: 10,
    },
    badgeCanceled :{
      backgroundColor: '#FED7D7', 
      color: '#E53E3E',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      overflow: 'hidden',
      marginLeft: 10,
    }
});



export default Items;
