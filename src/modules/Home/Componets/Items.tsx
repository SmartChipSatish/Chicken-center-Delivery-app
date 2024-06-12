import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ItemCard from './itemCard';
import { useNavigation } from '@react-navigation/native';
import { useGetOrdersMutation } from '../../../store/services/ServiceApis';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setordesCount,setLoading } from '../../../store/slices';
interface Item {
   id: number;
   franchiseId: any;
   AssignedBy: any;
   userId: any,
   addressId:any,
   date: string
}

const Items: React.FC = () => {
   const navigate: any = useNavigation()
   const [ordersListApi] = useGetOrdersMutation() 
   const [ordersList,setOrdersList]=useState<any>()
   const user = useSelector((state:any)=>state?.reusableStore?.userInfo)
   const dispatch = useDispatch()

   const getOrdersList = async()=>{
      dispatch(setLoading(true))
      const response = await ordersListApi(user?._id)
      if(response){
         let InprogressCount = await response?.data?.filter((item:any)=> item?.orderStatus == 'In Process')
         dispatch(setordesCount({total:response?.data?.length,inProgress:InprogressCount?.length}))
         setOrdersList(response?.data)
      }
      setTimeout(()=>{
         dispatch(setLoading(false))
      },1000)
   }
   useEffect(()=>{
      getOrdersList()
   },[user])

return (
   <>
   {
      ordersList?.length > 0 && ordersList?.map((item: Item,) => {
         return (
            <ItemCard
               itemName={item.franchiseId._id}
               orderDetails={item.franchiseId.name}
               timeStamp={item.date}
               userDetails={item.userId}
               addressId = {item.addressId}
               i={item.id}
               onViewPress={() => navigate.navigate('Order', { item })}
               />
            )
      })
   }
   </>
);
};



export default Items;
