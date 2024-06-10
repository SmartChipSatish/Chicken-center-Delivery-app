import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ItemCard from './itemCard';
import { useNavigation } from '@react-navigation/native';
import { useGetOrdersMutation } from '../../../store/services/ServiceApis';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setordesCount } from '../../../store/slices';
interface Item {
   id: number;
   franchiseId: any;
   AssignedBy: any;
   location: any,
   date: string
}

const Items: React.FC = () => {
   const navigate: any = useNavigation()
   const [ordersListApi] = useGetOrdersMutation() 
   const [ordersList,setOrdersList]=useState<any>()
   const user = useSelector((state:any)=>state?.reusableStore?.userInfo)
   const dispatch = useDispatch()

   const getOrdersList = async()=>{
      const response = await ordersListApi(user?._id)
      if(response){
         let InprogressCount = response?.data?.filter((item:any)=> item?.orderStatus == 'In Process')
         dispatch(setordesCount({total:response?.data?.length,inProgress:InprogressCount?.length}))
         setOrdersList(response?.data)
      }
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
               itemName={item.franchiseId}
               orderDetails={item.AssignedBy}
               timeStamp={item.date}
               location={item.location}
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
