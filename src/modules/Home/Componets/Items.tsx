import React from 'react';
import { FlatList } from 'react-native';
import ItemCard from './itemCard';
import { useNavigation } from '@react-navigation/native';

interface Item {
   id: number;
   name: string;
   AssignedBy: string;
   location: String,
   orderAt: string
}

const itemsData: Item[] = [
   {
      id: 1,
      name: '665c30261f5c2d3ad0ce3727',
      AssignedBy: 'Lingampalli Franchase',
      location: "Kondapur",
      orderAt: '2024-06-02T08:41:10.731+00:00'
   },
   {
      id: 2,
      name: '665c30261f5c2d3ad0ce3727',
      AssignedBy: 'Lingampalli Franchase',
      location: "Kondapur",
      orderAt: '2024-06-02T08:41:10.731+00:00'
   },
   {
      id: 3,
      name: '665c30261f5c2d3ad0ce3727',
      AssignedBy: 'Lingampalli Franchase',
      location: "Kondapur",
      orderAt: '2024-06-02T08:41:10.731+00:00'
   },
   {
      id: 4,
      name: '665c30261f5c2d3ad0ce3727',
      AssignedBy: 'Lingampalli Franchase',
      location: "Kondapur",
      orderAt: '2024-06-02T08:41:10.731+00:00'
   },
   {
      id: 5,
      name: '665c30261f5c2d3ad0ce3727',
      AssignedBy: 'Lingampalli Franchase',
      location: "Kondapur",
      orderAt: '2024-06-02T08:41:10.731+00:00'
   },
   {
      id: 6,
      name: '665c30261f5c2d3ad0ce3727',
      AssignedBy: 'Lingampalli Franchase',
      location: "Kondapur",
      orderAt: '2024-06-02T08:41:10.731+00:00'
   },
   {
      id: 7,
      name: '665c30261f5c2d3ad0ce3727',
      AssignedBy: 'Lingampalli Franchase',
      location: "Kondapur",
      orderAt: '2024-06-02T08:41:10.731+00:00'
   },
];

const Items: React.FC = () => {
   const navigate: any = useNavigation()
return (
   <>
   {
      itemsData?.length > 0 && itemsData?.map((item: Item,) => {
         return (
            <ItemCard
               itemName={item.name}
               orderDetails={item.AssignedBy}
               timeStamp={item.orderAt}
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
