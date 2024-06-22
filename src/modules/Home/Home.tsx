import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from './Componets/Header';
import { THEME_COLORS } from '../../globalStyles/GlobalStyles';
import Items from './Componets/Items';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const orders = useSelector((state: any) => state?.reusableStore?.ordesCount)
  const [listName, setListName] = useState('inComplete')
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


        <Items />
      </View>
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
    padding: 10
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
