import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Keyboard, Animated, Linking, PermissionsAndroid, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import INR from 'react-native-vector-icons/FontAwesome'
import { THEME_COLORS } from '../../globalStyles/GlobalStyles';
import { formatTimestamp } from '../Utiles';
import QRmodal from './Componets/QRmodal';
import Addressmodal from './Componets/Addressmodal';
import { useUpdateOrderMutation } from '../../store/services/ServiceApis';
import Loading from '../../Hooks/Loading';


interface Item {
  id: number;
  franchiseId: any;
  AssignedBy: string;
  location: string;
  date: string;
  items:any,
  paymentStatus:string,
}

type RootStackParamList = {
  OrderDetails: { item: Item };
};

type OrderDetailsScreenRouteProp = RouteProp<RootStackParamList, 'OrderDetails'>;

interface OrderDetailsProps {
  route: OrderDetailsScreenRouteProp;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ route }) => {
  const { item }:any = route.params;
  const [otp, setOtp] = useState('');
  const navigation: any = useNavigation();
  const [headtext,setHeadtext]:any=useState(true)
  const [headerHeight] = useState(new Animated.Value(height * 0.2));
  const [modalVisible, setModalVisible] = useState(false);
  const [modalname,setModalname] = useState()
  const [updateOrder] = useUpdateOrderMutation()
  const [isloading,setIsloading] =useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    setHeadtext(false)
    Animated.timing(headerHeight, {
      toValue: height * 0.1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const _keyboardDidHide = () => {
    setHeadtext(true)
    Animated.timing(headerHeight, {
      toValue: height * 0.2,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const modalOpen = (type:any) =>{
    setModalVisible(true)
    setModalname(type)
  }

  const otpVerify = async ()=>{
    if(!otp){
      return console.log('Enter user OTP')
    }
  }

  const updateOrderStatus = async ()=>{
    try {
      setIsloading(true)
      _keyboardDidShow()
      const payload = {
        id:item?._id,
        body:{
          orderStatus:'DELIVERD'
        }
      }
      const response =  await updateOrder(payload).unwrap()
      navigation.navigate('Home')
      setIsloading(false)
    } catch (error) {
      setIsloading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header,{height:headerHeight}]}>        
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Details</Text>
      </View>{
        headtext && 
        <View style={styles.headerContent}>
          <TimeIcon name="timer-cog-outline" size={60} color="#fff" />
          <Text style={styles.headerInnerText}>you have 40 minutes Time to delivery this order</Text>
        </View>
        }
      </Animated.View>
      {
        !isloading && 
      <View style={styles.content}>
        <View>
          {
            item?.items?.length > 0 ? item?.items?.map((item:any)=>{
              return(
                <View style={styles.ItemCard}>
                <Image source={{uri:item?.imageUrl}} style={styles.ItemImage} />
                <Text style={styles.ItemCardText}>{item.itemName}</Text>
                <Text style={styles.ItemCardText}>
                  <INR name="inr" size={20} color={THEME_COLORS.secondary} />
                  {item?.amount}
                </Text>
              </View>
              )}
           ) : <Text style={styles.bold}>List Not found</Text>
          }
        </View>
        <View style={styles.card1}>
          <Text style={styles.detail}><Text style={styles.bold}>Name:</Text> {item.franchiseId?._id}</Text>
          <Text style={styles.detail}><Text style={styles.bold}>AssignedBy:</Text> {item.franchiseId.name}</Text>
          <Text style={styles.detail}><Text style={styles.bold}>Location:</Text> {item.location}</Text>
          <Text style={styles.detail}><Text style={styles.bold}>OrderAt:</Text> {formatTimestamp(item.date)}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor='#000'
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
          {
            item?.paymentStatus !== 'SUCCESS' &&
          <TouchableOpacity style={styles.button} onPress={() => modalOpen('QR')}>
            <Text style={styles.buttonText}>QR Code</Text>
          </TouchableOpacity>
          }
          <TouchableOpacity style={styles.button} onPress={() => modalOpen('AD')}>
            <Text style={styles.buttonText}>Address View On Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>updateOrderStatus()}>
            <Text style={styles.buttonText}>Update Order</Text>
          </TouchableOpacity>
        </View>
      </View>
      }
      {
        isloading && <Loading />
      }
      {
        modalVisible && modalname == 'QR' && <QRmodal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      }
            {
        modalVisible && modalname == 'AD' && <Addressmodal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      }
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: THEME_COLORS.secondary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    padding: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 40
  },
  headerInnerText: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    marginVertical: 1,
    marginHorizontal: 10,
    letterSpacing: 2
  },
  content: {
    flex: 1,
    padding: 16,
  },
  ItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 10,
  },
  ItemImage: {
    width: 50,
    height: 50,
    borderRadius:100,
    resizeMode: 'contain'
  },
  ItemCardText: {
    fontSize: 18,
    color: '#000',
  },
  card1: {
    padding: 16,
    gap: 16,
    color: "#000",
    justifyContent: 'center',
    alignContent: 'center'
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000"
  },
  bold: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,

  },
  input: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 4,
    padding: 8,
    color: "#000"
  },
  verifyButton: {
    backgroundColor: THEME_COLORS.secondary,
    padding: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: THEME_COLORS.secondary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default OrderDetails;
