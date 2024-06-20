import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetOrdersMutation } from '../../../store/services/ServiceApis';
import { useSelector, useDispatch } from 'react-redux';
import { setordesCount, setLoading } from '../../../store/slices';
import { formatDate, formatTimestamp } from '../../Utiles';
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyles/GlobalStyles';
import TabButton from './TabButton';
import Loading from '../../../Hooks/Loading';
import PaymentStatusButton from './PaymentStatusButton';
import { RightArrowIcon } from '../../../assets/Iocns/RightArrowIcon';
import OrderStatusButton from './OrderStatusButton';

const Items = () => {
   const navigate: any = useNavigation();
   const [ordersListApi] = useGetOrdersMutation();
   const [ordersList, setOrdersList] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   const user = useSelector((state: any) => state?.reusableStore?.userInfo);
   const [selectedTab, setSelectedTab] = useState('INPROCESS');

   const dispatch = useDispatch();
   const TABS = {
      INPROCESS: 'INPROCESS',
      CANCELLED: 'Cancelled',
      DELIVERED: 'DELIVERD'
   };

   const getOrderData = async () => {
      setIsLoading(true);
      try {
         const response = await ordersListApi({ userId: user?._id, orderStatus: selectedTab });
         if (response.data.length > 0) {
            setOrdersList((prev) => [...prev, ...response.data]);
         } else {
            setOrdersList([])
         }
      } catch (error) {
         console.log(error);
      }
      setIsLoading(false);
   }

   const handleTabPress = (tab: React.SetStateAction<string>) => {
      setSelectedTab(tab);
      setOrdersList([]);
   };

   useEffect(() => {
      getOrderData();
   }, [selectedTab]);

   return (
      <View style={{ marginTop: -10, flex: 1 }}>
         <View style={styles.tabsContainer}>
            <TabButton label={'RECEIVED'} isSelected={selectedTab === TABS.INPROCESS} onPress={() => handleTabPress(TABS.INPROCESS)} />
            <TabButton label={'DELIVERED'} isSelected={selectedTab === TABS.DELIVERED} onPress={() => handleTabPress(TABS.DELIVERED)} />
            <TabButton label={'CANCELLED'} isSelected={selectedTab === TABS.CANCELLED} onPress={() => handleTabPress(TABS.CANCELLED)} />
         </View>

         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {
               ordersList?.length > 0 ? ordersList?.map((item: any) => {
                  return (
                     <Pressable key={item._id}
                        onPress={() => { navigate.navigate('Order', { item }) }}
                        style={({ pressed }) => [
                           {
                              backgroundColor: pressed ? '#ddd' : '#f0f0f0',
                              transform: [{ scale: pressed ? 0.98 : 1 }],
                           },
                           styles.main_card,
                        ]}
                     >
                        <View style={styles.card} key={item?._id}>
                           <View style={styles.inline}>
                              <View>
                                 <View style={styles.orderIdContainer}>
                                    <Text style={styles.orderIdText}>ORDER ID: </Text>
                                    <Text style={styles.orderIdHeader}>#{item?.id.slice(-9)}</Text>
                                 </View>
                                 <Text>
                                    <Text style={styles.orderDetails}>Order Time: </Text>
                                    <Text style={styles.bold}>{formatTimestamp(item.date)}</Text>
                                 </Text>
                                 <Text>
                                    <Text style={styles.orderDetails}>Order Date: </Text>
                                    <Text style={styles.bold}>{formatDate(item.date)}</Text>
                                 </Text>
                                 <Text>
                                    <Text style={styles.orderDetails}>Assigned By: </Text>
                                    <Text style={[styles.bold, styles.capitalizeText]}>{item.franchiseId.name}</Text>
                                 </Text>
                                 <View style={styles.inline} >
                                    <Text style={styles.orderDetails}>Payment Status: </Text>
                                    <PaymentStatusButton status={item?.paymentStatus} />
                                 </View>
                              </View>
                              <View>
                                 <OrderStatusButton status={item?.orderStatus} />

                              </View>
                              <View>
                                 <View style={styles.cardArrow}>
                                    <RightArrowIcon />
                                 </View>
                              </View>


                           </View>

                        </View>
                     </Pressable>
                  )
               })
                  :
                  !isLoading && ordersList?.length === 0 && <View style={styles.noOrdersContainer}>
                     <Text style={styles.orderDetails}>{`No Orders`} </Text>
                  </View>
            }
            {isLoading && <Loading />}
         </ScrollView >
      </View >
   )
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#f0f0f0',
   },
   tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#f2f2f2',
      paddingVertical: 10,
   },
   main_card: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      paddingVertical: 2,
   },
   card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 10,
      width: '96%',
      top: 10
   },
   itemName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: THEME_COLORS.secondary,
   },
   bold: {
      color: '#000',
      fontSize: 13,
      textAlign: 'center',
      fontWeight: 'bold',

   },
   orderDetails: {
      fontSize: 13,
      color: '#000',
   },
   button: {
      alignSelf: 'flex-end',
      backgroundColor: THEME_COLORS.secondary,
      padding: 8,
      borderRadius: 4,
   },
   buttonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      letterSpacing: 2
   },

   inline: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between',
   },
   noOrdersContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
   },
   orderIdContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 4,

   },
   capitalizeText: {
      textTransform: 'capitalize'
   },
   orderIdText: {
      fontSize: 15,
      color: TEXT_COLORS.secondary,
      fontWeight: "500",
   },
   orderIdHeader: {
      fontSize: 15,
      color: THEME_COLORS.secondary,
      fontWeight: "bold",
      textTransform: 'uppercase'
   },

   cardArrow: {
      transform: [{ translateX: 3 }],
      marginLeft: 10,
   },

});

export default Items;