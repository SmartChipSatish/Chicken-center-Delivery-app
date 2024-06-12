import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from './Componets/Header';
import Card from './Componets/Card';
import { THEME_COLORS } from '../../globalStyles/GlobalStyles';
import Items from './Componets/Items';
import { useSelector } from 'react-redux';
import Location from './Componets/Location';

const HomeScreen = () => {
  const orders = useSelector((state: any) => state?.reusableStore?.ordesCount)
  const handleAddress = (location: any) => {
    const flat = location?.address?.split(',')?.shift() || '';
    console.log(flat)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <Location handleAddress={handleAddress} />
      <View style={styles.contentContainer}>
        <View style={styles.content1}>
          <Card title='Total orders' value={orders?.total} />
          <Card title='In Progress' value={orders?.inProgress} />
        </View>
        <View style={styles.content2}>
          <Text style={styles.OrdersText}>Your Assinged Order's :</Text>
          <ScrollView >
            {/* <Items /> */}
          </ScrollView>
        </View>
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
});

export default HomeScreen;
