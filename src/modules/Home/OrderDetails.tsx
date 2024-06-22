import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, Linking, Image, ScrollView, TextInput } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { TEXT_COLORS, TEXT_FONT_SIZE, THEME_COLORS } from '../../globalStyles/GlobalStyles';
import { ShowToster, formatTimestamp } from '../Utiles';
import QRmodal from './Componets/QRmodal';
import { useUpdateOrderMutation } from '../../store/services/ServiceApis';
import Loading from '../../Hooks/Loading';
import CustomHeader from '../../Hooks/CustomHeader';
import OrderStatusButton from './Componets/OrderStatusButton';
import { useToast } from 'react-native-toast-notifications';

type RootStackParamList = {
  OrderDetails: { item: any };
};

type OrderDetailsScreenRouteProp = RouteProp<RootStackParamList, 'OrderDetails'>;
interface OrderDetailsProps {
  route: OrderDetailsScreenRouteProp;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ route }) => {
  const { item }: any = route.params;
  const [otp, setOtp] = useState('');
  const navigation: any = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalname, setModalname] = useState()
  const [updateOrder] = useUpdateOrderMutation()
  const [isloading, setIsloading] = useState(false)
  const [isVerify, setIsVerify] = useState(false)
  const [location, setLocation] = useState<any>(null);
  const inputRef: any = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const toast = useToast()
  const [errors, setErrors] = useState({
    otp: '',
  });


  const modalOpen = (type: any) => {
    setModalVisible(true)
    setModalname(type)
  }

  const otpVerify = async () => {
      const vaild = await validateFields()
      if (vaild) {
        ShowToster(toast,'OTP Verified SuccessFully' ,'' ,'success')
        setOtp('')
        setIsVerify(true)
      }
      Keyboard.dismiss();
      if (inputRef.current) {
        inputRef.current.blur();
      }
  }

  const updateOrderStatus = async () => {
    try {
      setIsloading(true)
      const payload = {
        id: item?._id,
        body: {
          orderStatus: 'DELIVERD'
        }
      }
      const response = await updateOrder(payload).unwrap()
      navigation.navigate('Home')
      setIsloading(false)
    } catch (error:any) {
      setIsloading(false)
      ShowToster(toast,error?.message,'','error')
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

  const validateFields = () => {
    let myotp = `1234`
    let valid = true;
    let errorsCopy = { otp: ''};
    if (!otp) {
      errorsCopy.otp = 'OTP is required.';
      valid = false;
    }
    if (otp === myotp) {
      valid = true;
    }

    console.log(valid)

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <View style={styles.container}>
      <CustomHeader tittle={'Order Summary'} Navigate={'Home'} />
      <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
        {!isloading ?
          <ScrollView style={styles.Cardcontainer}>
            {item && item?.items?.length > 0 && item?.items?.map((item: any) => (
              <View key={item?._id} style={styles.card}>
                <Image style={styles.tinyLogo} source={item?.imageUrl ? { uri: item?.imageUrl } : require('../../assets/Chicken.jpeg')} />
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item?.itemName}</Text>
                  <View style={{flexDirection:'row-reverse',alignItems:'center',justifyContent:'flex-end',gap:10}}>
                    <Text style={styles.price1}>Qty:{item?.itemQty}</Text>
                    <Text style={styles.price}>₹{item?.itemPrice}</Text>
                  </View>
                </View>
              </View>
            ))}
              <View style={styles.cards}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent:'center' }}>
                  <Text style={styles.Billdetails}>{isKeyboardVisible ? 'Verify OTP' :'Order Details'}</Text>
                  {
                    item.orderStatus !== 'In Process'  && <OrderStatusButton status={item.orderStatus} />
                  }
                </View>
                {
                  !isKeyboardVisible && <>
                <Text style={styles.AlltextColors}>Order id</Text>
                <Text style={[styles.AlltexFonts, styles.textColor]}>#{item?._id}</Text>
                <Text style={styles.AlltextColors}>UserName</Text>
                <Text style={styles.AlltexFonts}>{item?.userId?.name}</Text>
                <Text style={styles.AlltextColors}>Mobile</Text>
                <Text style={styles.AlltexFonts}>{item?.userId?.primaryNumber}</Text>
                <Text style={styles.AlltextColors}>Payment</Text>
                <Text style={styles.AlltexFonts}>{item?.paymentStatus === 'PENDING' ? 'Cash On Delivery' : 'Online'}</Text>
                <Text style={styles.AlltextColors}>Deliver to</Text>
                <Text style={styles.AlltexFonts}>{`${location?.name || ''} ${location?.landmark || ''} ${location?.city || ''} ${location?.state || ''} ${location?.pincode || ''}`}</Text>
                <Text style={styles.AlltextColors}>Order Placed</Text>
                <Text style={styles.AlltexFonts}>{formatTimestamp(item?.date)}</Text>
                </>
              }
                <View style={styles.card1}>
                  {
                    item.orderStatus === 'INPROCESS' &&  !isVerify &&
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
                      <TouchableOpacity style={styles.verifyButton} onPress={otpVerify}>
                        <Text style={styles.verifyButtonText}>Verify</Text>
                      </TouchableOpacity>
                    </View>
                  }
                  {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}
                  {/* {
                    item?.paymentStatus !== 'SUCCESS' && isVerify &&
                    <TouchableOpacity style={styles.button} onPress={() => modalOpen('QR')}>
                      <Text style={styles.buttonText}>QR Code</Text>
                    </TouchableOpacity>
                  } */}
                  {
                    isVerify && <TouchableOpacity style={styles.button} onPress={() => updateOrderStatus()}>
                      <Text style={styles.buttonText}>Update Order</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
          </ScrollView> :
          <View style={styles.loading}>
            <Loading />
          </View>
        }
      </View>
      {
        modalVisible && modalname == 'QR' && <QRmodal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inlineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
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
    gap: 2
  },
  ItemCardText: {
    fontSize: 18,
    color: '#000',
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
    marginLeft: 10
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
    padding: 12,
    color: "#000"
  },
  verifyButton: {
    backgroundColor: THEME_COLORS.secondary,
    padding: 15,
    borderRadius: 4,
    marginLeft: 10,
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
  AlltextColors: {
    color: "#626364",
    fontWeight: "400",
    margin: 5
  },
  orderSummarys: {
    color: TEXT_COLORS.primary,
    fontSize: TEXT_FONT_SIZE.large,
    marginLeft: 5,
    height: 35,
    fontWeight: '600'
  },
  Cardcontainer: {
    padding: 10,
  },
  cards: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 9, height: 7 },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 4,
    padding: 16,
    marginBottom: 5,
  },
  AlltexFonts: {
    color: '#626364',
    fontWeight: "600",
    marginBottom: 6,
    marginLeft: 5
  },
  Billdetails: {
    fontWeight: "bold",
    color: "#626364",
    fontSize: 20,
    marginBottom: 10
  },
  BilldetailsMain: {
    fontWeight: "bold",
    color: "#626364",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10
  },
  discounts: {
    color: "green",
    fontSize: 8,
    fontWeight: "bold"
  },
  orderHeader: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 57,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 100, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  crossMark: {
    top: 5
  },
  OrderDetails: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textColor: {
    color: THEME_COLORS.secondary,
    fontWeight: "bold",
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
  tinyLogo: {
    height: 50,
    width: 50,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: TEXT_FONT_SIZE.small,
    color: TEXT_COLORS.primary,
  },
  price: {
    fontSize: TEXT_FONT_SIZE.medium,
    color: THEME_COLORS.secondary,
    marginVertical: 2,
    fontWeight: "bold"
  },
  price1: {
    fontSize: 13,
    color: TEXT_COLORS.secondary,
    marginVertical: 2,
    fontWeight: '800'
  },
  leftText: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
    marginLeft: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  }
});

export default OrderDetails;
