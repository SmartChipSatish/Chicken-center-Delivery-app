import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Keyboard, Animated, Linking, PermissionsAndroid, Image,Platform } from 'react-native';
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
import CustomHeader from '../../Hooks/CustomHeader';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

type RootStackParamList = {
  OrderDetails: { item: any };
};

type OrderDetailsScreenRouteProp = RouteProp<RootStackParamList, 'OrderDetails'>;
interface OrderDetailsProps {
  route: OrderDetailsScreenRouteProp;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ route }) => {
  const { item } :any = route.params;
  const [otp, setOtp] = useState('');
  const navigation: any = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalname,setModalname] = useState()
  const [updateOrder] = useUpdateOrderMutation()
  const [isloading,setIsloading] =useState(false)
  const [isVerify,setIsVerify]=useState(false)
  const [location, setLocation] = useState<any>(null);
  const [currentLatitude, setCurrentLatitude] = useState<number | null>(null);
  const [currentLongitude, setCurrentLongitude] = useState<number | null>(null);
  const inputRef :any= useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  const modalOpen = (type:any) =>{
    setModalVisible(true)
    setModalname(type)
  }

  const otpVerify = async ()=>{
    let myotp = `1234`
    console.log('otp == myotp : ', otp == myotp );
    if(!otp){
      return console.log('Enter user OTP')
    }
    if(otp == myotp ){
      console.log("Heeeee")
      setIsVerify(true)
      Keyboard.dismiss();
      if (inputRef.current) {
          inputRef.current.blur();
      }
      setOtp('')
    }else{
      return console.log('Enter user OTP')
    }
  }

  const updateOrderStatus = async ()=>{
    try {
      setIsloading(true)
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

  const fetchLocation = async () => {
    const address = await item?.userId?.secondaryAddress?.filter((ad: any) => ad?._id === item?.addressId);
    const data = address?.length > 0 ? address[0] : 'No location found';
    setLocation(data);
  };

  useEffect(() => {
    fetchLocation();

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };

  }, []);

  const openGoogleMaps = async () => {
    Geocoder.init('AIzaSyC0gW5zGpTdX-XaxspBWi_jfCNYdIaJBsY');
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);
      },
      error => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    if (currentLatitude && currentLongitude) {
      const remoteLatitude = location?.location?.coordinates[0]; // Replace with actual remote latitude
      const remoteLongitude = location?.location?.coordinates[1]; // Replace with actual remote longitude
      const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${remoteLatitude},${remoteLongitude}`;
      Linking.openURL(url);
    }
  };
console.log(isVerify)
  return (
    <View style={styles.container}>
        <CustomHeader tittle={'Order Summary'} Navigate={'Home'} />
      {
        !isloading && 
      <View style={styles.content}>
        <View>
        {item?.items?.length > 0 ? (
              item?.items?.map((item: any, i: any) => (
                <View style={styles.inlineCard} key={i}>
                  <Text style={[styles.ItemCardText, styles.bold]}>
                    {i + 1}.
                  </Text>
                  <Image
                    source={item?.imageUrl ? { uri: item?.imageUrl } : require('../../assets/Chicken.jpeg')}
                    style={styles.ItemImage}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.ItemCardText}>{item.itemName}</Text>
                    <View style={[styles.itemDetails,{flexDirection:'row'},{gap:20}]}>
                      <Text style={styles.ItemCardText}>
                        <Text style={styles.bold}>Price :</Text>
                        {item?.amount}
                      </Text>
                      <Text style={styles.ItemCardText}>
                        <Text style={styles.bold}>Quntity :</Text>{item?.itemQty}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.bold}>List Not found</Text>
            )}
        </View>
        {
          !isKeyboardVisible && 
        <View style={styles.card}>
        <Text style={[styles.bold,{color:THEME_COLORS.secondary},{fontSize:20},{marginBottom:10}]}>Order Details:</Text>
            <Text style={styles.detail}>
              OrderId:<Text style={[styles.bold]}> {`#${item._id}`}</Text> 
            </Text>
            <Text style={styles.detail}>
                AssignedBy: <Text style={styles.bold}> {item.franchiseId.name}</Text> 
            </Text>
            <Text style={styles.detail}>
               OrderAt:<Text style={styles.bold}> {formatTimestamp(item.date)}</Text> 
            </Text>
            <Text style={styles.detail}>
               Total Items:<Text style={styles.bold}> {item?.totals?.quantity}</Text> 
            </Text>
            <Text style={styles.detail}>
               Total Amount:<Text style={styles.bold}> {item?.totals?.amount}</Text> 
            </Text>
            <Text style={styles.detail}>
              Location:<Text style={styles.bold}> {location?.city || 'Loading...'}</Text> 
            </Text>
            <View style={styles.inline}>
              <Text style={styles.detail}>Payment Status: </Text>
              <Text style={[
                  styles.detail, 
                  item.paymentStatus === 'PENDING' ? styles.badgePending 
                     : item.paymentStatus === 'Cancelled' ? styles.badgeCanceled 
                     : styles.badgePaid
                  ]}>
                {item.paymentStatus}
              </Text>
            </View>
        </View>
        }
        <View style={styles.card1}>
            {
              !isVerify &&
              <View style={styles.inputContainer}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="#000"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.verifyButton} onPress={()=>otpVerify()}>
                <Text style={styles.verifyButtonText}>Verify</Text>
              </TouchableOpacity>
            </View>
            }
            {
            item?.paymentStatus !== 'SUCCESS' && isVerify  &&
          <TouchableOpacity style={styles.button} onPress={() => modalOpen('QR')}>
            <Text style={styles.buttonText}>QR Code</Text>
          </TouchableOpacity>
          }
          <TouchableOpacity style={styles.button} onPress={()=>openGoogleMaps()}>
            <Text style={styles.buttonText}>Address View On Map</Text>
          </TouchableOpacity>
          {
            isVerify && <TouchableOpacity style={styles.button} onPress={()=>updateOrderStatus()}>
            <Text style={styles.buttonText}>Update Order</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
      }
      {
        isloading && <Loading />
      }
      {
        modalVisible && modalname == 'QR' && <QRmodal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inlineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap:10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  ItemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    resizeMode: 'contain',
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    gap:2
  },
  ItemCardText: {
    fontSize: 18,
    color: '#000',
  },
  card: {
    padding: 16,
    borderRadius:5,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderColor:'#000'
  },
  card1: {
    padding: 16,
    gap: 10,
    color: '#000',
    justifyContent: 'center',
    alignContent: 'center',
  },
  detail: {
    fontSize: 16,
    marginBottom: 12,
    color: '#000',
    marginLeft:10
  },
  bold: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
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
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default OrderDetails;
