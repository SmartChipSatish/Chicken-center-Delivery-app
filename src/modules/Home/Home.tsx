import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from './Componets/Header';
import Card from './Componets/Card';
import { THEME_COLORS } from '../../globalStyles/GlobalStyles';
import Items from './Componets/Items';
import { useSelector } from 'react-redux';
import Location from './Componets/Location';
import Loading from '../../Hooks/Loading';

const HomeScreen = () => {
  const orders = useSelector((state: any) => state?.reusableStore?.ordesCount)
  const isloading = useSelector((state: any) => state?.reusableStore?.Loading)
  const [listName,setListName] = useState('inComplete')
  const handleAddress = (location: any) => {
    const flat = location?.address?.split(',')?.shift() || '';
    console.log(flat)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      {/* <Location handleAddress={handleAddress} /> */}    
      <View style={styles.contentContainer}>
        <View style={styles.OptionsContainer}>
          <TouchableOpacity style={listName == 'inComplete' ? [styles.button,{backgroundColor:THEME_COLORS.secondary}] : styles.button} onPress={()=>setListName('inComplete')}>
            <Text style={ listName == 'inComplete' ? [styles.buttonText,{color:'#fff',fontWeight:'bold'}] : styles.buttonText}>InComplete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={listName == 'Completed' ? [styles.button,{backgroundColor:THEME_COLORS.secondary}] : styles.button} onPress={()=>setListName('Completed')}>
            <Text style={ listName == 'Completed' ? [styles.buttonText,{color:'#fff',fontWeight:'bold'}] : styles.buttonText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={listName == 'Cancelled' ? [styles.button,{backgroundColor:THEME_COLORS.secondary}] : styles.button}onPress={()=>setListName('Cancelled')}  >
            <Text style={ listName == 'Cancelled' ? [styles.buttonText,{color:'#fff',fontWeight:'bold'}] : styles.buttonText}>Cancelled</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content2}>
          {
            !isloading && <Text style={styles.OrdersText}>{listName == 'Cancelled' ? 'Cancelled orders:' : listName == 'Progress' ? 'Progress Orders:' : 'Completed Orders:'}</Text>
          }
          <ScrollView >
            <Items listName={listName} />
          </ScrollView>
        </View>
      </View>
      {isloading && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: THEME_COLORS.secondary,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  content1: {
    flex: 0.15,
    flexDirection: 'row',
    gap: 40,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  content2: {
    flex: 1,
    paddingHorizontal: 20,
  },
  OrdersText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#000",
    paddingVertical: 10,
  },
  OptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default HomeScreen;
