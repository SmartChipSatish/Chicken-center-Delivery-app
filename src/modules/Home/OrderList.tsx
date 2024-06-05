import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../../Hooks/CustomHeader'

export default function OrderList() {
  return (
    <View>
      <CustomHeader tittle='Total orders' Navigate='Home'/>
      <Text>OrderList</Text>
    </View>
  )
}